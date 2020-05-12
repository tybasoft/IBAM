import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MateriauComponentsPage, { MateriauDeleteDialog } from './materiau.page-object';
import MateriauUpdatePage from './materiau-update.page-object';
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

describe('Materiau e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let materiauComponentsPage: MateriauComponentsPage;
  let materiauUpdatePage: MateriauUpdatePage;
  let materiauDeleteDialog: MateriauDeleteDialog;
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

  it('should load Materiaus', async () => {
    await navBarPage.getEntityPage('materiau');
    materiauComponentsPage = new MateriauComponentsPage();
    expect(await materiauComponentsPage.title.getText()).to.match(/Materiaus/);

    expect(await materiauComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([materiauComponentsPage.noRecords, materiauComponentsPage.table]);

    beforeRecordsCount = (await isVisible(materiauComponentsPage.noRecords)) ? 0 : await getRecordsCount(materiauComponentsPage.table);
  });

  it('should load create Materiau page', async () => {
    await materiauComponentsPage.createButton.click();
    materiauUpdatePage = new MateriauUpdatePage();
    expect(await materiauUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.materiau.home.createOrEditLabel/);
    await materiauUpdatePage.cancel();
  });

  it('should create and save Materiaus', async () => {
    await materiauComponentsPage.createButton.click();
    await materiauUpdatePage.setLibelleInput('libelle');
    expect(await materiauUpdatePage.getLibelleInput()).to.match(/libelle/);
    await materiauUpdatePage.setReferenceInput('reference');
    expect(await materiauUpdatePage.getReferenceInput()).to.match(/reference/);
    await materiauUpdatePage.setPoidsInput('poids');
    expect(await materiauUpdatePage.getPoidsInput()).to.match(/poids/);
    await materiauUpdatePage.setVolumeInput('volume');
    expect(await materiauUpdatePage.getVolumeInput()).to.match(/volume/);
    await materiauUpdatePage.setUserModifInput('userModif');
    expect(await materiauUpdatePage.getUserModifInput()).to.match(/userModif/);
    await materiauUpdatePage.setDateModifInput('01-01-2001');
    expect(await materiauUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await materiauUpdatePage.marqueSelectLastOption();
    await materiauUpdatePage.uniteSelectLastOption();
    await materiauUpdatePage.familleSelectLastOption();
    await materiauUpdatePage.tvaSelectLastOption();
    await materiauUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(materiauUpdatePage.saveButton);
    await materiauUpdatePage.save();
    await waitUntilHidden(materiauUpdatePage.saveButton);
    expect(await isVisible(materiauUpdatePage.saveButton)).to.be.false;

    expect(await materiauComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(materiauComponentsPage.table);

    await waitUntilCount(materiauComponentsPage.records, beforeRecordsCount + 1);
    expect(await materiauComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Materiau', async () => {
    const deleteButton = materiauComponentsPage.getDeleteButton(materiauComponentsPage.records.last());
    await click(deleteButton);

    materiauDeleteDialog = new MateriauDeleteDialog();
    await waitUntilDisplayed(materiauDeleteDialog.deleteModal);
    expect(await materiauDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.materiau.delete.question/);
    await materiauDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(materiauDeleteDialog.deleteModal);

    expect(await isVisible(materiauDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([materiauComponentsPage.noRecords, materiauComponentsPage.table]);

    const afterCount = (await isVisible(materiauComponentsPage.noRecords)) ? 0 : await getRecordsCount(materiauComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
