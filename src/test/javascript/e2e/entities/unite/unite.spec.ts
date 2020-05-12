import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UniteComponentsPage, { UniteDeleteDialog } from './unite.page-object';
import UniteUpdatePage from './unite-update.page-object';
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

describe('Unite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let uniteComponentsPage: UniteComponentsPage;
  let uniteUpdatePage: UniteUpdatePage;
  let uniteDeleteDialog: UniteDeleteDialog;
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

  it('should load Unites', async () => {
    await navBarPage.getEntityPage('unite');
    uniteComponentsPage = new UniteComponentsPage();
    expect(await uniteComponentsPage.title.getText()).to.match(/Unites/);

    expect(await uniteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([uniteComponentsPage.noRecords, uniteComponentsPage.table]);

    beforeRecordsCount = (await isVisible(uniteComponentsPage.noRecords)) ? 0 : await getRecordsCount(uniteComponentsPage.table);
  });

  it('should load create Unite page', async () => {
    await uniteComponentsPage.createButton.click();
    uniteUpdatePage = new UniteUpdatePage();
    expect(await uniteUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.unite.home.createOrEditLabel/);
    await uniteUpdatePage.cancel();
  });

  it('should create and save Unites', async () => {
    await uniteComponentsPage.createButton.click();
    await uniteUpdatePage.setLibelleInput('libelle');
    expect(await uniteUpdatePage.getLibelleInput()).to.match(/libelle/);
    await uniteUpdatePage.setSymboleInput('symbole');
    expect(await uniteUpdatePage.getSymboleInput()).to.match(/symbole/);
    await uniteUpdatePage.setDescriptionInput('description');
    expect(await uniteUpdatePage.getDescriptionInput()).to.match(/description/);
    await uniteUpdatePage.setUserModifInput('userModif');
    expect(await uniteUpdatePage.getUserModifInput()).to.match(/userModif/);
    await uniteUpdatePage.setDateModifInput('01-01-2001');
    expect(await uniteUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(uniteUpdatePage.saveButton);
    await uniteUpdatePage.save();
    await waitUntilHidden(uniteUpdatePage.saveButton);
    expect(await isVisible(uniteUpdatePage.saveButton)).to.be.false;

    expect(await uniteComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(uniteComponentsPage.table);

    await waitUntilCount(uniteComponentsPage.records, beforeRecordsCount + 1);
    expect(await uniteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Unite', async () => {
    const deleteButton = uniteComponentsPage.getDeleteButton(uniteComponentsPage.records.last());
    await click(deleteButton);

    uniteDeleteDialog = new UniteDeleteDialog();
    await waitUntilDisplayed(uniteDeleteDialog.deleteModal);
    expect(await uniteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.unite.delete.question/);
    await uniteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(uniteDeleteDialog.deleteModal);

    expect(await isVisible(uniteDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([uniteComponentsPage.noRecords, uniteComponentsPage.table]);

    const afterCount = (await isVisible(uniteComponentsPage.noRecords)) ? 0 : await getRecordsCount(uniteComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
