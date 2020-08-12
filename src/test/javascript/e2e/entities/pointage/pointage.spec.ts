import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PointageComponentsPage, { PointageDeleteDialog } from './pointage.page-object';
import PointageUpdatePage from './pointage-update.page-object';
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

describe('Pointage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pointageComponentsPage: PointageComponentsPage;
  let pointageUpdatePage: PointageUpdatePage;
  let pointageDeleteDialog: PointageDeleteDialog;
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

  it('should load Pointages', async () => {
    await navBarPage.getEntityPage('pointage');
    pointageComponentsPage = new PointageComponentsPage();
    expect(await pointageComponentsPage.title.getText()).to.match(/Pointages/);

    expect(await pointageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([pointageComponentsPage.noRecords, pointageComponentsPage.table]);

    beforeRecordsCount = (await isVisible(pointageComponentsPage.noRecords)) ? 0 : await getRecordsCount(pointageComponentsPage.table);
  });

  it('should load create Pointage page', async () => {
    await pointageComponentsPage.createButton.click();
    pointageUpdatePage = new PointageUpdatePage();
    expect(await pointageUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.pointage.home.createOrEditLabel/);
    await pointageUpdatePage.cancel();
  });

  it('should create and save Pointages', async () => {
    await pointageComponentsPage.createButton.click();
    await pointageUpdatePage.setDateJourInput('01-01-2001');
    expect(await pointageUpdatePage.getDateJourInput()).to.eq('2001-01-01');
    const selectedPresenceMatin = await pointageUpdatePage.getPresenceMatinInput().isSelected();
    if (selectedPresenceMatin) {
      await pointageUpdatePage.getPresenceMatinInput().click();
      expect(await pointageUpdatePage.getPresenceMatinInput().isSelected()).to.be.false;
    } else {
      await pointageUpdatePage.getPresenceMatinInput().click();
      expect(await pointageUpdatePage.getPresenceMatinInput().isSelected()).to.be.true;
    }
    const selectedPresenceAPM = await pointageUpdatePage.getPresenceAPMInput().isSelected();
    if (selectedPresenceAPM) {
      await pointageUpdatePage.getPresenceAPMInput().click();
      expect(await pointageUpdatePage.getPresenceAPMInput().isSelected()).to.be.false;
    } else {
      await pointageUpdatePage.getPresenceAPMInput().click();
      expect(await pointageUpdatePage.getPresenceAPMInput().isSelected()).to.be.true;
    }
    await pointageUpdatePage.setNbrHeureSupInput('nbrHeureSup');
    expect(await pointageUpdatePage.getNbrHeureSupInput()).to.match(/nbrHeureSup/);
    await pointageUpdatePage.setRemarquesInput('remarques');
    expect(await pointageUpdatePage.getRemarquesInput()).to.match(/remarques/);
    await pointageUpdatePage.setUserModifInput('userModif');
    expect(await pointageUpdatePage.getUserModifInput()).to.match(/userModif/);
    await pointageUpdatePage.setDateModifInput('01-01-2001');
    expect(await pointageUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await pointageUpdatePage.employeSelectLastOption();
    await waitUntilDisplayed(pointageUpdatePage.saveButton);
    await pointageUpdatePage.save();
    await waitUntilHidden(pointageUpdatePage.saveButton);
    expect(await isVisible(pointageUpdatePage.saveButton)).to.be.false;

    expect(await pointageComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(pointageComponentsPage.table);

    await waitUntilCount(pointageComponentsPage.records, beforeRecordsCount + 1);
    expect(await pointageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Pointage', async () => {
    const deleteButton = pointageComponentsPage.getDeleteButton(pointageComponentsPage.records.last());
    await click(deleteButton);

    pointageDeleteDialog = new PointageDeleteDialog();
    await waitUntilDisplayed(pointageDeleteDialog.deleteModal);
    expect(await pointageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.pointage.delete.question/);
    await pointageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(pointageDeleteDialog.deleteModal);

    expect(await isVisible(pointageDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([pointageComponentsPage.noRecords, pointageComponentsPage.table]);

    const afterCount = (await isVisible(pointageComponentsPage.noRecords)) ? 0 : await getRecordsCount(pointageComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
