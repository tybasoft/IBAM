import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompteRenduComponentsPage, { CompteRenduDeleteDialog } from './compte-rendu.page-object';
import CompteRenduUpdatePage from './compte-rendu-update.page-object';
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

describe('CompteRendu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let compteRenduComponentsPage: CompteRenduComponentsPage;
  let compteRenduUpdatePage: CompteRenduUpdatePage;
  let compteRenduDeleteDialog: CompteRenduDeleteDialog;
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

  it('should load CompteRendus', async () => {
    await navBarPage.getEntityPage('compte-rendu');
    compteRenduComponentsPage = new CompteRenduComponentsPage();
    expect(await compteRenduComponentsPage.title.getText()).to.match(/Compte Rendus/);

    expect(await compteRenduComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([compteRenduComponentsPage.noRecords, compteRenduComponentsPage.table]);

    beforeRecordsCount = (await isVisible(compteRenduComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(compteRenduComponentsPage.table);
  });

  it('should load create CompteRendu page', async () => {
    await compteRenduComponentsPage.createButton.click();
    compteRenduUpdatePage = new CompteRenduUpdatePage();
    expect(await compteRenduUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.compteRendu.home.createOrEditLabel/);
    await compteRenduUpdatePage.cancel();
  });

  it('should create and save CompteRendus', async () => {
    await compteRenduComponentsPage.createButton.click();
    await compteRenduUpdatePage.setTitreInput('titre');
    expect(await compteRenduUpdatePage.getTitreInput()).to.match(/titre/);
    await compteRenduUpdatePage.setContenuInput('contenu');
    expect(await compteRenduUpdatePage.getContenuInput()).to.match(/contenu/);
    await compteRenduUpdatePage.setFilePathInput('filePath');
    expect(await compteRenduUpdatePage.getFilePathInput()).to.match(/filePath/);
    await compteRenduUpdatePage.employeSelectLastOption();
    await waitUntilDisplayed(compteRenduUpdatePage.saveButton);
    await compteRenduUpdatePage.save();
    await waitUntilHidden(compteRenduUpdatePage.saveButton);
    expect(await isVisible(compteRenduUpdatePage.saveButton)).to.be.false;

    expect(await compteRenduComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(compteRenduComponentsPage.table);

    await waitUntilCount(compteRenduComponentsPage.records, beforeRecordsCount + 1);
    expect(await compteRenduComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CompteRendu', async () => {
    const deleteButton = compteRenduComponentsPage.getDeleteButton(compteRenduComponentsPage.records.last());
    await click(deleteButton);

    compteRenduDeleteDialog = new CompteRenduDeleteDialog();
    await waitUntilDisplayed(compteRenduDeleteDialog.deleteModal);
    expect(await compteRenduDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.compteRendu.delete.question/);
    await compteRenduDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(compteRenduDeleteDialog.deleteModal);

    expect(await isVisible(compteRenduDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([compteRenduComponentsPage.noRecords, compteRenduComponentsPage.table]);

    const afterCount = (await isVisible(compteRenduComponentsPage.noRecords)) ? 0 : await getRecordsCount(compteRenduComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
