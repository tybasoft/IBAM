import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LigneBonReceptionComponentsPage, { LigneBonReceptionDeleteDialog } from './ligne-bon-reception.page-object';
import LigneBonReceptionUpdatePage from './ligne-bon-reception-update.page-object';
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

describe('LigneBonReception e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ligneBonReceptionComponentsPage: LigneBonReceptionComponentsPage;
  let ligneBonReceptionUpdatePage: LigneBonReceptionUpdatePage;
  let ligneBonReceptionDeleteDialog: LigneBonReceptionDeleteDialog;
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

  it('should load LigneBonReceptions', async () => {
    await navBarPage.getEntityPage('ligne-bon-reception');
    ligneBonReceptionComponentsPage = new LigneBonReceptionComponentsPage();
    expect(await ligneBonReceptionComponentsPage.title.getText()).to.match(/Ligne Bon Receptions/);

    expect(await ligneBonReceptionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([ligneBonReceptionComponentsPage.noRecords, ligneBonReceptionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(ligneBonReceptionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneBonReceptionComponentsPage.table);
  });

  it('should load create LigneBonReception page', async () => {
    await ligneBonReceptionComponentsPage.createButton.click();
    ligneBonReceptionUpdatePage = new LigneBonReceptionUpdatePage();
    expect(await ligneBonReceptionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ibamApp.ligneBonReception.home.createOrEditLabel/
    );
    await ligneBonReceptionUpdatePage.cancel();
  });

  it('should create and save LigneBonReceptions', async () => {
    await ligneBonReceptionComponentsPage.createButton.click();
    await ligneBonReceptionUpdatePage.setQuantiteInput('quantite');
    expect(await ligneBonReceptionUpdatePage.getQuantiteInput()).to.match(/quantite/);
    await ligneBonReceptionUpdatePage.setPrixHtInput('prixHt');
    expect(await ligneBonReceptionUpdatePage.getPrixHtInput()).to.match(/prixHt/);
    await ligneBonReceptionUpdatePage.setUserModifInput('userModif');
    expect(await ligneBonReceptionUpdatePage.getUserModifInput()).to.match(/userModif/);
    await ligneBonReceptionUpdatePage.setDateModifInput('01-01-2001');
    expect(await ligneBonReceptionUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await ligneBonReceptionUpdatePage.bonReceptionSelectLastOption();
    await ligneBonReceptionUpdatePage.materiauSelectLastOption();
    await waitUntilDisplayed(ligneBonReceptionUpdatePage.saveButton);
    await ligneBonReceptionUpdatePage.save();
    await waitUntilHidden(ligneBonReceptionUpdatePage.saveButton);
    expect(await isVisible(ligneBonReceptionUpdatePage.saveButton)).to.be.false;

    expect(await ligneBonReceptionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(ligneBonReceptionComponentsPage.table);

    await waitUntilCount(ligneBonReceptionComponentsPage.records, beforeRecordsCount + 1);
    expect(await ligneBonReceptionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last LigneBonReception', async () => {
    const deleteButton = ligneBonReceptionComponentsPage.getDeleteButton(ligneBonReceptionComponentsPage.records.last());
    await click(deleteButton);

    ligneBonReceptionDeleteDialog = new LigneBonReceptionDeleteDialog();
    await waitUntilDisplayed(ligneBonReceptionDeleteDialog.deleteModal);
    expect(await ligneBonReceptionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.ligneBonReception.delete.question/);
    await ligneBonReceptionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ligneBonReceptionDeleteDialog.deleteModal);

    expect(await isVisible(ligneBonReceptionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([ligneBonReceptionComponentsPage.noRecords, ligneBonReceptionComponentsPage.table]);

    const afterCount = (await isVisible(ligneBonReceptionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneBonReceptionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
