import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TvaComponentsPage, { TvaDeleteDialog } from './tva.page-object';
import TvaUpdatePage from './tva-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('Tva e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tvaComponentsPage: TvaComponentsPage;
  let tvaUpdatePage: TvaUpdatePage;
  let tvaDeleteDialog: TvaDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Tvas', async () => {
    await navBarPage.getEntityPage('tva');
    tvaComponentsPage = new TvaComponentsPage();
    expect(await tvaComponentsPage.title.getText()).to.match(/Tvas/);

    expect(await tvaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tvaComponentsPage.noRecords, tvaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tvaComponentsPage.noRecords)) ? 0 : await getRecordsCount(tvaComponentsPage.table);
  });

  it('should load create Tva page', async () => {
    await tvaComponentsPage.createButton.click();
    tvaUpdatePage = new TvaUpdatePage();
    expect(await tvaUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.tva.home.createOrEditLabel/);
    await tvaUpdatePage.cancel();
  });

  it('should create and save Tvas', async () => {
    await tvaComponentsPage.createButton.click();
    await tvaUpdatePage.setTauxInput('taux');
    expect(await tvaUpdatePage.getTauxInput()).to.match(/taux/);
    await tvaUpdatePage.setUserModifInput('userModif');
    expect(await tvaUpdatePage.getUserModifInput()).to.match(/userModif/);
    await tvaUpdatePage.setDateModifInput('01-01-2001');
    expect(await tvaUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(tvaUpdatePage.saveButton);
    await tvaUpdatePage.save();
    await waitUntilHidden(tvaUpdatePage.saveButton);
    expect(await isVisible(tvaUpdatePage.saveButton)).to.be.false;

    expect(await tvaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tvaComponentsPage.table);

    await waitUntilCount(tvaComponentsPage.records, beforeRecordsCount + 1);
    expect(await tvaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Tva', async () => {
    const deleteButton = tvaComponentsPage.getDeleteButton(tvaComponentsPage.records.last());
    await click(deleteButton);

    tvaDeleteDialog = new TvaDeleteDialog();
    await waitUntilDisplayed(tvaDeleteDialog.deleteModal);
    expect(await tvaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.tva.delete.question/);
    await tvaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tvaDeleteDialog.deleteModal);

    expect(await isVisible(tvaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tvaComponentsPage.noRecords, tvaComponentsPage.table]);

    const afterCount = (await isVisible(tvaComponentsPage.noRecords)) ? 0 : await getRecordsCount(tvaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
