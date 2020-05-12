import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CentreMaintenanceComponentsPage, { CentreMaintenanceDeleteDialog } from './centre-maintenance.page-object';
import CentreMaintenanceUpdatePage from './centre-maintenance-update.page-object';
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

describe('CentreMaintenance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let centreMaintenanceComponentsPage: CentreMaintenanceComponentsPage;
  let centreMaintenanceUpdatePage: CentreMaintenanceUpdatePage;
  let centreMaintenanceDeleteDialog: CentreMaintenanceDeleteDialog;
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

  it('should load CentreMaintenances', async () => {
    await navBarPage.getEntityPage('centre-maintenance');
    centreMaintenanceComponentsPage = new CentreMaintenanceComponentsPage();
    expect(await centreMaintenanceComponentsPage.title.getText()).to.match(/Centre Maintenances/);

    expect(await centreMaintenanceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([centreMaintenanceComponentsPage.noRecords, centreMaintenanceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(centreMaintenanceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(centreMaintenanceComponentsPage.table);
  });

  it('should load create CentreMaintenance page', async () => {
    await centreMaintenanceComponentsPage.createButton.click();
    centreMaintenanceUpdatePage = new CentreMaintenanceUpdatePage();
    expect(await centreMaintenanceUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ibamApp.centreMaintenance.home.createOrEditLabel/
    );
    await centreMaintenanceUpdatePage.cancel();
  });

  it('should create and save CentreMaintenances', async () => {
    await centreMaintenanceComponentsPage.createButton.click();
    await centreMaintenanceUpdatePage.setLibelleInput('libelle');
    expect(await centreMaintenanceUpdatePage.getLibelleInput()).to.match(/libelle/);
    await centreMaintenanceUpdatePage.setSpecialiteInput('specialite');
    expect(await centreMaintenanceUpdatePage.getSpecialiteInput()).to.match(/specialite/);
    await centreMaintenanceUpdatePage.setResponsableInput('responsable');
    expect(await centreMaintenanceUpdatePage.getResponsableInput()).to.match(/responsable/);
    await centreMaintenanceUpdatePage.setAdresseInput('adresse');
    expect(await centreMaintenanceUpdatePage.getAdresseInput()).to.match(/adresse/);
    await centreMaintenanceUpdatePage.setTelephoneInput('telephone');
    expect(await centreMaintenanceUpdatePage.getTelephoneInput()).to.match(/telephone/);
    await centreMaintenanceUpdatePage.setEmailInput('email');
    expect(await centreMaintenanceUpdatePage.getEmailInput()).to.match(/email/);
    await centreMaintenanceUpdatePage.setUserModifInput('userModif');
    expect(await centreMaintenanceUpdatePage.getUserModifInput()).to.match(/userModif/);
    await centreMaintenanceUpdatePage.setDateModifInput('01-01-2001');
    expect(await centreMaintenanceUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(centreMaintenanceUpdatePage.saveButton);
    await centreMaintenanceUpdatePage.save();
    await waitUntilHidden(centreMaintenanceUpdatePage.saveButton);
    expect(await isVisible(centreMaintenanceUpdatePage.saveButton)).to.be.false;

    expect(await centreMaintenanceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(centreMaintenanceComponentsPage.table);

    await waitUntilCount(centreMaintenanceComponentsPage.records, beforeRecordsCount + 1);
    expect(await centreMaintenanceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CentreMaintenance', async () => {
    const deleteButton = centreMaintenanceComponentsPage.getDeleteButton(centreMaintenanceComponentsPage.records.last());
    await click(deleteButton);

    centreMaintenanceDeleteDialog = new CentreMaintenanceDeleteDialog();
    await waitUntilDisplayed(centreMaintenanceDeleteDialog.deleteModal);
    expect(await centreMaintenanceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.centreMaintenance.delete.question/);
    await centreMaintenanceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(centreMaintenanceDeleteDialog.deleteModal);

    expect(await isVisible(centreMaintenanceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([centreMaintenanceComponentsPage.noRecords, centreMaintenanceComponentsPage.table]);

    const afterCount = (await isVisible(centreMaintenanceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(centreMaintenanceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
