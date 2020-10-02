import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FamilleComponentsPage, { FamilleDeleteDialog } from './famille.page-object';
import FamilleUpdatePage from './famille-update.page-object';
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

describe('Famille e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let familleComponentsPage: FamilleComponentsPage;
  let familleUpdatePage: FamilleUpdatePage;
  let familleDeleteDialog: FamilleDeleteDialog;
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

  it('should load Familles', async () => {
    await navBarPage.getEntityPage('famille');
    familleComponentsPage = new FamilleComponentsPage();
    expect(await familleComponentsPage.title.getText()).to.match(/Familles/);

    expect(await familleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([familleComponentsPage.noRecords, familleComponentsPage.table]);

    beforeRecordsCount = (await isVisible(familleComponentsPage.noRecords)) ? 0 : await getRecordsCount(familleComponentsPage.table);
  });

  it('should load create Famille page', async () => {
    await familleComponentsPage.createButton.click();
    familleUpdatePage = new FamilleUpdatePage();
    expect(await familleUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.famille.home.createOrEditLabel/);
    await familleUpdatePage.cancel();
  });

  it('should create and save Familles', async () => {
    await familleComponentsPage.createButton.click();
    await familleUpdatePage.setLibelleInput('libelle');
    expect(await familleUpdatePage.getLibelleInput()).to.match(/libelle/);
    await familleUpdatePage.setDescriptionInput('description');
    expect(await familleUpdatePage.getDescriptionInput()).to.match(/description/);
    await familleUpdatePage.setUserModifInput('userModif');
    expect(await familleUpdatePage.getUserModifInput()).to.match(/userModif/);
    await familleUpdatePage.setDateModifInput('01-01-2001');
    expect(await familleUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(familleUpdatePage.saveButton);
    await familleUpdatePage.save();
    await waitUntilHidden(familleUpdatePage.saveButton);
    expect(await isVisible(familleUpdatePage.saveButton)).to.be.false;

    expect(await familleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(familleComponentsPage.table);

    await waitUntilCount(familleComponentsPage.records, beforeRecordsCount + 1);
    expect(await familleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Famille', async () => {
    const deleteButton = familleComponentsPage.getDeleteButton(familleComponentsPage.records.last());
    await click(deleteButton);

    familleDeleteDialog = new FamilleDeleteDialog();
    await waitUntilDisplayed(familleDeleteDialog.deleteModal);
    expect(await familleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.famille.delete.question/);
    await familleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(familleDeleteDialog.deleteModal);

    expect(await isVisible(familleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([familleComponentsPage.noRecords, familleComponentsPage.table]);

    const afterCount = (await isVisible(familleComponentsPage.noRecords)) ? 0 : await getRecordsCount(familleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
