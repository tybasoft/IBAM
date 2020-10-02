import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DepotComponentsPage, { DepotDeleteDialog } from './depot.page-object';
import DepotUpdatePage from './depot-update.page-object';
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

describe('Depot e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let depotComponentsPage: DepotComponentsPage;
  let depotUpdatePage: DepotUpdatePage;
  let depotDeleteDialog: DepotDeleteDialog;
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

  it('should load Depots', async () => {
    await navBarPage.getEntityPage('depot');
    depotComponentsPage = new DepotComponentsPage();
    expect(await depotComponentsPage.title.getText()).to.match(/Depots/);

    expect(await depotComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([depotComponentsPage.noRecords, depotComponentsPage.table]);

    beforeRecordsCount = (await isVisible(depotComponentsPage.noRecords)) ? 0 : await getRecordsCount(depotComponentsPage.table);
  });

  it('should load create Depot page', async () => {
    await depotComponentsPage.createButton.click();
    depotUpdatePage = new DepotUpdatePage();
    expect(await depotUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.depot.home.createOrEditLabel/);
    await depotUpdatePage.cancel();
  });

  it('should create and save Depots', async () => {
    await depotComponentsPage.createButton.click();
    await depotUpdatePage.setLibelleInput('libelle');
    expect(await depotUpdatePage.getLibelleInput()).to.match(/libelle/);
    await depotUpdatePage.setAdresseInput('adresse');
    expect(await depotUpdatePage.getAdresseInput()).to.match(/adresse/);
    await depotUpdatePage.setTelInput('tel');
    expect(await depotUpdatePage.getTelInput()).to.match(/tel/);
    await depotUpdatePage.setVilleInput('ville');
    expect(await depotUpdatePage.getVilleInput()).to.match(/ville/);
    await depotUpdatePage.setPaysInput('pays');
    expect(await depotUpdatePage.getPaysInput()).to.match(/pays/);
    await depotUpdatePage.setUserModifInput('userModif');
    expect(await depotUpdatePage.getUserModifInput()).to.match(/userModif/);
    await depotUpdatePage.setDateModifInput('01-01-2001');
    expect(await depotUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(depotUpdatePage.saveButton);
    await depotUpdatePage.save();
    await waitUntilHidden(depotUpdatePage.saveButton);
    expect(await isVisible(depotUpdatePage.saveButton)).to.be.false;

    expect(await depotComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(depotComponentsPage.table);

    await waitUntilCount(depotComponentsPage.records, beforeRecordsCount + 1);
    expect(await depotComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Depot', async () => {
    const deleteButton = depotComponentsPage.getDeleteButton(depotComponentsPage.records.last());
    await click(deleteButton);

    depotDeleteDialog = new DepotDeleteDialog();
    await waitUntilDisplayed(depotDeleteDialog.deleteModal);
    expect(await depotDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.depot.delete.question/);
    await depotDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(depotDeleteDialog.deleteModal);

    expect(await isVisible(depotDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([depotComponentsPage.noRecords, depotComponentsPage.table]);

    const afterCount = (await isVisible(depotComponentsPage.noRecords)) ? 0 : await getRecordsCount(depotComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
