import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FonctionComponentsPage, { FonctionDeleteDialog } from './fonction.page-object';
import FonctionUpdatePage from './fonction-update.page-object';
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

describe('Fonction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fonctionComponentsPage: FonctionComponentsPage;
  let fonctionUpdatePage: FonctionUpdatePage;
  let fonctionDeleteDialog: FonctionDeleteDialog;
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

  it('should load Fonctions', async () => {
    await navBarPage.getEntityPage('fonction');
    fonctionComponentsPage = new FonctionComponentsPage();
    expect(await fonctionComponentsPage.title.getText()).to.match(/Fonctions/);

    expect(await fonctionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([fonctionComponentsPage.noRecords, fonctionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(fonctionComponentsPage.noRecords)) ? 0 : await getRecordsCount(fonctionComponentsPage.table);
  });

  it('should load create Fonction page', async () => {
    await fonctionComponentsPage.createButton.click();
    fonctionUpdatePage = new FonctionUpdatePage();
    expect(await fonctionUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.fonction.home.createOrEditLabel/);
    await fonctionUpdatePage.cancel();
  });

  it('should create and save Fonctions', async () => {
    await fonctionComponentsPage.createButton.click();
    await fonctionUpdatePage.setLibelleInput('libelle');
    expect(await fonctionUpdatePage.getLibelleInput()).to.match(/libelle/);
    await fonctionUpdatePage.setDescriptionInput('description');
    expect(await fonctionUpdatePage.getDescriptionInput()).to.match(/description/);
    await fonctionUpdatePage.setCompetencesInput('competences');
    expect(await fonctionUpdatePage.getCompetencesInput()).to.match(/competences/);
    await fonctionUpdatePage.setUserModifInput('userModif');
    expect(await fonctionUpdatePage.getUserModifInput()).to.match(/userModif/);
    await fonctionUpdatePage.setDateModifInput('01-01-2001');
    expect(await fonctionUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(fonctionUpdatePage.saveButton);
    await fonctionUpdatePage.save();
    await waitUntilHidden(fonctionUpdatePage.saveButton);
    expect(await isVisible(fonctionUpdatePage.saveButton)).to.be.false;

    expect(await fonctionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(fonctionComponentsPage.table);

    await waitUntilCount(fonctionComponentsPage.records, beforeRecordsCount + 1);
    expect(await fonctionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Fonction', async () => {
    const deleteButton = fonctionComponentsPage.getDeleteButton(fonctionComponentsPage.records.last());
    await click(deleteButton);

    fonctionDeleteDialog = new FonctionDeleteDialog();
    await waitUntilDisplayed(fonctionDeleteDialog.deleteModal);
    expect(await fonctionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.fonction.delete.question/);
    await fonctionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fonctionDeleteDialog.deleteModal);

    expect(await isVisible(fonctionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([fonctionComponentsPage.noRecords, fonctionComponentsPage.table]);

    const afterCount = (await isVisible(fonctionComponentsPage.noRecords)) ? 0 : await getRecordsCount(fonctionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
