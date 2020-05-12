import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LigneBonCommandeComponentsPage, { LigneBonCommandeDeleteDialog } from './ligne-bon-commande.page-object';
import LigneBonCommandeUpdatePage from './ligne-bon-commande-update.page-object';
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

describe('LigneBonCommande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ligneBonCommandeComponentsPage: LigneBonCommandeComponentsPage;
  let ligneBonCommandeUpdatePage: LigneBonCommandeUpdatePage;
  let ligneBonCommandeDeleteDialog: LigneBonCommandeDeleteDialog;
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

  it('should load LigneBonCommandes', async () => {
    await navBarPage.getEntityPage('ligne-bon-commande');
    ligneBonCommandeComponentsPage = new LigneBonCommandeComponentsPage();
    expect(await ligneBonCommandeComponentsPage.title.getText()).to.match(/Ligne Bon Commandes/);

    expect(await ligneBonCommandeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([ligneBonCommandeComponentsPage.noRecords, ligneBonCommandeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(ligneBonCommandeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneBonCommandeComponentsPage.table);
  });

  it('should load create LigneBonCommande page', async () => {
    await ligneBonCommandeComponentsPage.createButton.click();
    ligneBonCommandeUpdatePage = new LigneBonCommandeUpdatePage();
    expect(await ligneBonCommandeUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.ligneBonCommande.home.createOrEditLabel/);
    await ligneBonCommandeUpdatePage.cancel();
  });

  it('should create and save LigneBonCommandes', async () => {
    await ligneBonCommandeComponentsPage.createButton.click();
    await ligneBonCommandeUpdatePage.setQuantiteInput('quantite');
    expect(await ligneBonCommandeUpdatePage.getQuantiteInput()).to.match(/quantite/);
    await ligneBonCommandeUpdatePage.setUserModifInput('userModif');
    expect(await ligneBonCommandeUpdatePage.getUserModifInput()).to.match(/userModif/);
    await ligneBonCommandeUpdatePage.setDateModifInput('01-01-2001');
    expect(await ligneBonCommandeUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await ligneBonCommandeUpdatePage.bonCommandeSelectLastOption();
    await ligneBonCommandeUpdatePage.materiauSelectLastOption();
    await waitUntilDisplayed(ligneBonCommandeUpdatePage.saveButton);
    await ligneBonCommandeUpdatePage.save();
    await waitUntilHidden(ligneBonCommandeUpdatePage.saveButton);
    expect(await isVisible(ligneBonCommandeUpdatePage.saveButton)).to.be.false;

    expect(await ligneBonCommandeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(ligneBonCommandeComponentsPage.table);

    await waitUntilCount(ligneBonCommandeComponentsPage.records, beforeRecordsCount + 1);
    expect(await ligneBonCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last LigneBonCommande', async () => {
    const deleteButton = ligneBonCommandeComponentsPage.getDeleteButton(ligneBonCommandeComponentsPage.records.last());
    await click(deleteButton);

    ligneBonCommandeDeleteDialog = new LigneBonCommandeDeleteDialog();
    await waitUntilDisplayed(ligneBonCommandeDeleteDialog.deleteModal);
    expect(await ligneBonCommandeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.ligneBonCommande.delete.question/);
    await ligneBonCommandeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ligneBonCommandeDeleteDialog.deleteModal);

    expect(await isVisible(ligneBonCommandeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([ligneBonCommandeComponentsPage.noRecords, ligneBonCommandeComponentsPage.table]);

    const afterCount = (await isVisible(ligneBonCommandeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneBonCommandeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
