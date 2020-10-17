import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BonReceptionComponentsPage, { BonReceptionDeleteDialog } from './bon-reception.page-object';
import BonReceptionUpdatePage from './bon-reception-update.page-object';
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

describe('BonReception e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bonReceptionComponentsPage: BonReceptionComponentsPage;
  let bonReceptionUpdatePage: BonReceptionUpdatePage;
  let bonReceptionDeleteDialog: BonReceptionDeleteDialog;
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

  it('should load BonReceptions', async () => {
    await navBarPage.getEntityPage('bon-reception');
    bonReceptionComponentsPage = new BonReceptionComponentsPage();
    expect(await bonReceptionComponentsPage.title.getText()).to.match(/Bon Receptions/);

    expect(await bonReceptionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([bonReceptionComponentsPage.noRecords, bonReceptionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(bonReceptionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bonReceptionComponentsPage.table);
  });

  it('should load create BonReception page', async () => {
    await bonReceptionComponentsPage.createButton.click();
    bonReceptionUpdatePage = new BonReceptionUpdatePage();
    expect(await bonReceptionUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.bonReception.home.createOrEditLabel/);
    await bonReceptionUpdatePage.cancel();
  });

  it('should create and save BonReceptions', async () => {
    await bonReceptionComponentsPage.createButton.click();
    await bonReceptionUpdatePage.setLivreurInput('livreur');
    expect(await bonReceptionUpdatePage.getLivreurInput()).to.match(/livreur/);
    await bonReceptionUpdatePage.setRemarquesInput('remarques');
    expect(await bonReceptionUpdatePage.getRemarquesInput()).to.match(/remarques/);
    await bonReceptionUpdatePage.setDateLivraisonInput('01-01-2001');
    expect(await bonReceptionUpdatePage.getDateLivraisonInput()).to.eq('2001-01-01');
    await bonReceptionUpdatePage.setUserModifInput('userModif');
    expect(await bonReceptionUpdatePage.getUserModifInput()).to.match(/userModif/);
    await bonReceptionUpdatePage.setDateModifInput('01-01-2001');
    expect(await bonReceptionUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await bonReceptionUpdatePage.depotSelectLastOption();
    await bonReceptionUpdatePage.fournisseurSelectLastOption();
    await bonReceptionUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(bonReceptionUpdatePage.saveButton);
    await bonReceptionUpdatePage.save();
    await waitUntilHidden(bonReceptionUpdatePage.saveButton);
    expect(await isVisible(bonReceptionUpdatePage.saveButton)).to.be.false;

    expect(await bonReceptionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(bonReceptionComponentsPage.table);

    await waitUntilCount(bonReceptionComponentsPage.records, beforeRecordsCount + 1);
    expect(await bonReceptionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last BonReception', async () => {
    const deleteButton = bonReceptionComponentsPage.getDeleteButton(bonReceptionComponentsPage.records.last());
    await click(deleteButton);

    bonReceptionDeleteDialog = new BonReceptionDeleteDialog();
    await waitUntilDisplayed(bonReceptionDeleteDialog.deleteModal);
    expect(await bonReceptionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.bonReception.delete.question/);
    await bonReceptionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bonReceptionDeleteDialog.deleteModal);

    expect(await isVisible(bonReceptionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([bonReceptionComponentsPage.noRecords, bonReceptionComponentsPage.table]);

    const afterCount = (await isVisible(bonReceptionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bonReceptionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
