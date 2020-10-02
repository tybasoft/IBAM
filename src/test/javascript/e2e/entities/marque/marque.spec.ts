import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MarqueComponentsPage, { MarqueDeleteDialog } from './marque.page-object';
import MarqueUpdatePage from './marque-update.page-object';
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

describe('Marque e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let marqueComponentsPage: MarqueComponentsPage;
  let marqueUpdatePage: MarqueUpdatePage;
  let marqueDeleteDialog: MarqueDeleteDialog;
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

  it('should load Marques', async () => {
    await navBarPage.getEntityPage('marque');
    marqueComponentsPage = new MarqueComponentsPage();
    expect(await marqueComponentsPage.title.getText()).to.match(/Marques/);

    expect(await marqueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([marqueComponentsPage.noRecords, marqueComponentsPage.table]);

    beforeRecordsCount = (await isVisible(marqueComponentsPage.noRecords)) ? 0 : await getRecordsCount(marqueComponentsPage.table);
  });

  it('should load create Marque page', async () => {
    await marqueComponentsPage.createButton.click();
    marqueUpdatePage = new MarqueUpdatePage();
    expect(await marqueUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.marque.home.createOrEditLabel/);
    await marqueUpdatePage.cancel();
  });

  it('should create and save Marques', async () => {
    await marqueComponentsPage.createButton.click();
    await marqueUpdatePage.setLibelleInput('libelle');
    expect(await marqueUpdatePage.getLibelleInput()).to.match(/libelle/);
    await marqueUpdatePage.setDescriptionInput('description');
    expect(await marqueUpdatePage.getDescriptionInput()).to.match(/description/);
    await marqueUpdatePage.setUserModifInput('userModif');
    expect(await marqueUpdatePage.getUserModifInput()).to.match(/userModif/);
    await marqueUpdatePage.setDateModifInput('01-01-2001');
    expect(await marqueUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(marqueUpdatePage.saveButton);
    await marqueUpdatePage.save();
    await waitUntilHidden(marqueUpdatePage.saveButton);
    expect(await isVisible(marqueUpdatePage.saveButton)).to.be.false;

    expect(await marqueComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(marqueComponentsPage.table);

    await waitUntilCount(marqueComponentsPage.records, beforeRecordsCount + 1);
    expect(await marqueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Marque', async () => {
    const deleteButton = marqueComponentsPage.getDeleteButton(marqueComponentsPage.records.last());
    await click(deleteButton);

    marqueDeleteDialog = new MarqueDeleteDialog();
    await waitUntilDisplayed(marqueDeleteDialog.deleteModal);
    expect(await marqueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.marque.delete.question/);
    await marqueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(marqueDeleteDialog.deleteModal);

    expect(await isVisible(marqueDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([marqueComponentsPage.noRecords, marqueComponentsPage.table]);

    const afterCount = (await isVisible(marqueComponentsPage.noRecords)) ? 0 : await getRecordsCount(marqueComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
