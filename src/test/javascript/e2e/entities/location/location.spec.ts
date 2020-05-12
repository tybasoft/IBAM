import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LocationComponentsPage, { LocationDeleteDialog } from './location.page-object';
import LocationUpdatePage from './location-update.page-object';
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

describe('Location e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let locationComponentsPage: LocationComponentsPage;
  let locationUpdatePage: LocationUpdatePage;
  let locationDeleteDialog: LocationDeleteDialog;
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

  it('should load Locations', async () => {
    await navBarPage.getEntityPage('location');
    locationComponentsPage = new LocationComponentsPage();
    expect(await locationComponentsPage.title.getText()).to.match(/Locations/);

    expect(await locationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([locationComponentsPage.noRecords, locationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(locationComponentsPage.noRecords)) ? 0 : await getRecordsCount(locationComponentsPage.table);
  });

  it('should load create Location page', async () => {
    await locationComponentsPage.createButton.click();
    locationUpdatePage = new LocationUpdatePage();
    expect(await locationUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.location.home.createOrEditLabel/);
    await locationUpdatePage.cancel();
  });

  it('should create and save Locations', async () => {
    await locationComponentsPage.createButton.click();
    await locationUpdatePage.setReferenceInput('reference');
    expect(await locationUpdatePage.getReferenceInput()).to.match(/reference/);
    await locationUpdatePage.setDateDebutInput('01-01-2001');
    expect(await locationUpdatePage.getDateDebutInput()).to.eq('2001-01-01');
    await locationUpdatePage.setDateFinInput('01-01-2001');
    expect(await locationUpdatePage.getDateFinInput()).to.eq('2001-01-01');
    await locationUpdatePage.setTarifInput('tarif');
    expect(await locationUpdatePage.getTarifInput()).to.match(/tarif/);
    await locationUpdatePage.setDureLocationInput('dureLocation');
    expect(await locationUpdatePage.getDureLocationInput()).to.match(/dureLocation/);
    await locationUpdatePage.setMontantLocationInput('montantLocation');
    expect(await locationUpdatePage.getMontantLocationInput()).to.match(/montantLocation/);
    await locationUpdatePage.setRemarqueInput('remarque');
    expect(await locationUpdatePage.getRemarqueInput()).to.match(/remarque/);
    await locationUpdatePage.setUserModifInput('userModif');
    expect(await locationUpdatePage.getUserModifInput()).to.match(/userModif/);
    await locationUpdatePage.setDateModifInput('01-01-2001');
    expect(await locationUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await locationUpdatePage.materielSelectLastOption();
    await waitUntilDisplayed(locationUpdatePage.saveButton);
    await locationUpdatePage.save();
    await waitUntilHidden(locationUpdatePage.saveButton);
    expect(await isVisible(locationUpdatePage.saveButton)).to.be.false;

    expect(await locationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(locationComponentsPage.table);

    await waitUntilCount(locationComponentsPage.records, beforeRecordsCount + 1);
    expect(await locationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Location', async () => {
    const deleteButton = locationComponentsPage.getDeleteButton(locationComponentsPage.records.last());
    await click(deleteButton);

    locationDeleteDialog = new LocationDeleteDialog();
    await waitUntilDisplayed(locationDeleteDialog.deleteModal);
    expect(await locationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.location.delete.question/);
    await locationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(locationDeleteDialog.deleteModal);

    expect(await isVisible(locationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([locationComponentsPage.noRecords, locationComponentsPage.table]);

    const afterCount = (await isVisible(locationComponentsPage.noRecords)) ? 0 : await getRecordsCount(locationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
