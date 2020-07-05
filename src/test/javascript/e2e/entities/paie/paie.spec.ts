import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PaieComponentsPage, { PaieDeleteDialog } from './paie.page-object';
import PaieUpdatePage from './paie-update.page-object';
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

describe('Paie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paieComponentsPage: PaieComponentsPage;
  let paieUpdatePage: PaieUpdatePage;
  let paieDeleteDialog: PaieDeleteDialog;
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

  it('should load Paies', async () => {
    await navBarPage.getEntityPage('paie');
    paieComponentsPage = new PaieComponentsPage();
    expect(await paieComponentsPage.title.getText()).to.match(/Paies/);

    expect(await paieComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([paieComponentsPage.noRecords, paieComponentsPage.table]);

    beforeRecordsCount = (await isVisible(paieComponentsPage.noRecords)) ? 0 : await getRecordsCount(paieComponentsPage.table);
  });

  it('should load create Paie page', async () => {
    await paieComponentsPage.createButton.click();
    paieUpdatePage = new PaieUpdatePage();
    expect(await paieUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.paie.home.createOrEditLabel/);
    await paieUpdatePage.cancel();
  });

  it('should create and save Paies', async () => {
    await paieComponentsPage.createButton.click();
    await paieUpdatePage.setDatePaiementInput('01-01-2001');
    expect(await paieUpdatePage.getDatePaiementInput()).to.eq('2001-01-01');
    await paieUpdatePage.setNbrJourTravailInput('nbrJourTravail');
    expect(await paieUpdatePage.getNbrJourTravailInput()).to.match(/nbrJourTravail/);
    await paieUpdatePage.setMontantPayInput('montantPay');
    expect(await paieUpdatePage.getMontantPayInput()).to.match(/montantPay/);
    await paieUpdatePage.setNbrHeurSupInput('nbrHeurSup');
    expect(await paieUpdatePage.getNbrHeurSupInput()).to.match(/nbrHeurSup/);
    await paieUpdatePage.setDateDebutInput('01-01-2001');
    expect(await paieUpdatePage.getDateDebutInput()).to.eq('2001-01-01');
    await paieUpdatePage.setDateFinInput('01-01-2001');
    expect(await paieUpdatePage.getDateFinInput()).to.eq('2001-01-01');
    await paieUpdatePage.setRemarquesInput('remarques');
    expect(await paieUpdatePage.getRemarquesInput()).to.match(/remarques/);
    await paieUpdatePage.setUserModifInput('userModif');
    expect(await paieUpdatePage.getUserModifInput()).to.match(/userModif/);
    await paieUpdatePage.setDateModifInput('01-01-2001');
    expect(await paieUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await paieUpdatePage.employeSelectLastOption();
    await waitUntilDisplayed(paieUpdatePage.saveButton);
    await paieUpdatePage.save();
    await waitUntilHidden(paieUpdatePage.saveButton);
    expect(await isVisible(paieUpdatePage.saveButton)).to.be.false;

    expect(await paieComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(paieComponentsPage.table);

    await waitUntilCount(paieComponentsPage.records, beforeRecordsCount + 1);
    expect(await paieComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Paie', async () => {
    const deleteButton = paieComponentsPage.getDeleteButton(paieComponentsPage.records.last());
    await click(deleteButton);

    paieDeleteDialog = new PaieDeleteDialog();
    await waitUntilDisplayed(paieDeleteDialog.deleteModal);
    expect(await paieDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.paie.delete.question/);
    await paieDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(paieDeleteDialog.deleteModal);

    expect(await isVisible(paieDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([paieComponentsPage.noRecords, paieComponentsPage.table]);

    const afterCount = (await isVisible(paieComponentsPage.noRecords)) ? 0 : await getRecordsCount(paieComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
