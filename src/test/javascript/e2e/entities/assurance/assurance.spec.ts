import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AssuranceComponentsPage, { AssuranceDeleteDialog } from './assurance.page-object';
import AssuranceUpdatePage from './assurance-update.page-object';
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

describe('Assurance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assuranceComponentsPage: AssuranceComponentsPage;
  let assuranceUpdatePage: AssuranceUpdatePage;
  let assuranceDeleteDialog: AssuranceDeleteDialog;
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

  it('should load Assurances', async () => {
    await navBarPage.getEntityPage('assurance');
    assuranceComponentsPage = new AssuranceComponentsPage();
    expect(await assuranceComponentsPage.title.getText()).to.match(/Assurances/);

    expect(await assuranceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([assuranceComponentsPage.noRecords, assuranceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(assuranceComponentsPage.noRecords)) ? 0 : await getRecordsCount(assuranceComponentsPage.table);
  });

  it('should load create Assurance page', async () => {
    await assuranceComponentsPage.createButton.click();
    assuranceUpdatePage = new AssuranceUpdatePage();
    expect(await assuranceUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.assurance.home.createOrEditLabel/);
    await assuranceUpdatePage.cancel();
  });

  it('should create and save Assurances', async () => {
    await assuranceComponentsPage.createButton.click();
    await assuranceUpdatePage.setDateDebutInput('01-01-2001');
    expect(await assuranceUpdatePage.getDateDebutInput()).to.eq('2001-01-01');
    await assuranceUpdatePage.setDateFinInput('01-01-2001');
    expect(await assuranceUpdatePage.getDateFinInput()).to.eq('2001-01-01');
    await assuranceUpdatePage.setAgenceInput('agence');
    expect(await assuranceUpdatePage.getAgenceInput()).to.match(/agence/);
    await assuranceUpdatePage.setUserModifInput('userModif');
    expect(await assuranceUpdatePage.getUserModifInput()).to.match(/userModif/);
    await assuranceUpdatePage.setDateModifInput('01-01-2001');
    expect(await assuranceUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await assuranceUpdatePage.materielSelectLastOption();
    await waitUntilDisplayed(assuranceUpdatePage.saveButton);
    await assuranceUpdatePage.save();
    await waitUntilHidden(assuranceUpdatePage.saveButton);
    expect(await isVisible(assuranceUpdatePage.saveButton)).to.be.false;

    expect(await assuranceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(assuranceComponentsPage.table);

    await waitUntilCount(assuranceComponentsPage.records, beforeRecordsCount + 1);
    expect(await assuranceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Assurance', async () => {
    const deleteButton = assuranceComponentsPage.getDeleteButton(assuranceComponentsPage.records.last());
    await click(deleteButton);

    assuranceDeleteDialog = new AssuranceDeleteDialog();
    await waitUntilDisplayed(assuranceDeleteDialog.deleteModal);
    expect(await assuranceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.assurance.delete.question/);
    await assuranceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(assuranceDeleteDialog.deleteModal);

    expect(await isVisible(assuranceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([assuranceComponentsPage.noRecords, assuranceComponentsPage.table]);

    const afterCount = (await isVisible(assuranceComponentsPage.noRecords)) ? 0 : await getRecordsCount(assuranceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
