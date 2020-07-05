import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MaintenanceComponentsPage, { MaintenanceDeleteDialog } from './maintenance.page-object';
import MaintenanceUpdatePage from './maintenance-update.page-object';
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

describe('Maintenance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let maintenanceComponentsPage: MaintenanceComponentsPage;
  let maintenanceUpdatePage: MaintenanceUpdatePage;
  let maintenanceDeleteDialog: MaintenanceDeleteDialog;
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

  it('should load Maintenances', async () => {
    await navBarPage.getEntityPage('maintenance');
    maintenanceComponentsPage = new MaintenanceComponentsPage();
    expect(await maintenanceComponentsPage.title.getText()).to.match(/Maintenances/);

    expect(await maintenanceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([maintenanceComponentsPage.noRecords, maintenanceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(maintenanceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(maintenanceComponentsPage.table);
  });

  it('should load create Maintenance page', async () => {
    await maintenanceComponentsPage.createButton.click();
    maintenanceUpdatePage = new MaintenanceUpdatePage();
    expect(await maintenanceUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.maintenance.home.createOrEditLabel/);
    await maintenanceUpdatePage.cancel();
  });

  it('should create and save Maintenances', async () => {
    await maintenanceComponentsPage.createButton.click();
    await maintenanceUpdatePage.setReferenceInput('reference');
    expect(await maintenanceUpdatePage.getReferenceInput()).to.match(/reference/);
    await maintenanceUpdatePage.setDatePanneInput('01-01-2001');
    expect(await maintenanceUpdatePage.getDatePanneInput()).to.eq('2001-01-01');
    await maintenanceUpdatePage.setFraisInput('frais');
    expect(await maintenanceUpdatePage.getFraisInput()).to.match(/frais/);
    await maintenanceUpdatePage.setTechnicienInput('technicien');
    expect(await maintenanceUpdatePage.getTechnicienInput()).to.match(/technicien/);
    await maintenanceUpdatePage.setMotifInput('motif');
    expect(await maintenanceUpdatePage.getMotifInput()).to.match(/motif/);
    const selectedProblemeFrequent = await maintenanceUpdatePage.getProblemeFrequentInput().isSelected();
    if (selectedProblemeFrequent) {
      await maintenanceUpdatePage.getProblemeFrequentInput().click();
      expect(await maintenanceUpdatePage.getProblemeFrequentInput().isSelected()).to.be.false;
    } else {
      await maintenanceUpdatePage.getProblemeFrequentInput().click();
      expect(await maintenanceUpdatePage.getProblemeFrequentInput().isSelected()).to.be.true;
    }
    await maintenanceUpdatePage.setRemarqueInput('remarque');
    expect(await maintenanceUpdatePage.getRemarqueInput()).to.match(/remarque/);
    await maintenanceUpdatePage.setDureePanneInput('dureePanne');
    expect(await maintenanceUpdatePage.getDureePanneInput()).to.match(/dureePanne/);
    await maintenanceUpdatePage.setUserModifInput('userModif');
    expect(await maintenanceUpdatePage.getUserModifInput()).to.match(/userModif/);
    await maintenanceUpdatePage.setDateModifInput('01-01-2001');
    expect(await maintenanceUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await maintenanceUpdatePage.materielSelectLastOption();
    await maintenanceUpdatePage.centreMaintenanceSelectLastOption();
    await maintenanceUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(maintenanceUpdatePage.saveButton);
    await maintenanceUpdatePage.save();
    await waitUntilHidden(maintenanceUpdatePage.saveButton);
    expect(await isVisible(maintenanceUpdatePage.saveButton)).to.be.false;

    expect(await maintenanceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(maintenanceComponentsPage.table);

    await waitUntilCount(maintenanceComponentsPage.records, beforeRecordsCount + 1);
    expect(await maintenanceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Maintenance', async () => {
    const deleteButton = maintenanceComponentsPage.getDeleteButton(maintenanceComponentsPage.records.last());
    await click(deleteButton);

    maintenanceDeleteDialog = new MaintenanceDeleteDialog();
    await waitUntilDisplayed(maintenanceDeleteDialog.deleteModal);
    expect(await maintenanceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.maintenance.delete.question/);
    await maintenanceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(maintenanceDeleteDialog.deleteModal);

    expect(await isVisible(maintenanceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([maintenanceComponentsPage.noRecords, maintenanceComponentsPage.table]);

    const afterCount = (await isVisible(maintenanceComponentsPage.noRecords)) ? 0 : await getRecordsCount(maintenanceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
