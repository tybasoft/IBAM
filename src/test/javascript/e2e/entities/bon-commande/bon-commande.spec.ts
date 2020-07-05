import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BonCommandeComponentsPage, { BonCommandeDeleteDialog } from './bon-commande.page-object';
import BonCommandeUpdatePage from './bon-commande-update.page-object';
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

describe('BonCommande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bonCommandeComponentsPage: BonCommandeComponentsPage;
  let bonCommandeUpdatePage: BonCommandeUpdatePage;
  let bonCommandeDeleteDialog: BonCommandeDeleteDialog;
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

  it('should load BonCommandes', async () => {
    await navBarPage.getEntityPage('bon-commande');
    bonCommandeComponentsPage = new BonCommandeComponentsPage();
    expect(await bonCommandeComponentsPage.title.getText()).to.match(/Bon Commandes/);

    expect(await bonCommandeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([bonCommandeComponentsPage.noRecords, bonCommandeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(bonCommandeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bonCommandeComponentsPage.table);
  });

  it('should load create BonCommande page', async () => {
    await bonCommandeComponentsPage.createButton.click();
    bonCommandeUpdatePage = new BonCommandeUpdatePage();
    expect(await bonCommandeUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.bonCommande.home.createOrEditLabel/);
    await bonCommandeUpdatePage.cancel();
  });

  it('should create and save BonCommandes', async () => {
    await bonCommandeComponentsPage.createButton.click();
    await bonCommandeUpdatePage.setDatePrevLivInput('01-01-2001');
    expect(await bonCommandeUpdatePage.getDatePrevLivInput()).to.eq('2001-01-01');
    await bonCommandeUpdatePage.setRemarquesInput('remarques');
    expect(await bonCommandeUpdatePage.getRemarquesInput()).to.match(/remarques/);
    await bonCommandeUpdatePage.setDateCreationInput('01-01-2001');
    expect(await bonCommandeUpdatePage.getDateCreationInput()).to.eq('2001-01-01');
    const selectedValide = await bonCommandeUpdatePage.getValideInput().isSelected();
    if (selectedValide) {
      await bonCommandeUpdatePage.getValideInput().click();
      expect(await bonCommandeUpdatePage.getValideInput().isSelected()).to.be.false;
    } else {
      await bonCommandeUpdatePage.getValideInput().click();
      expect(await bonCommandeUpdatePage.getValideInput().isSelected()).to.be.true;
    }
    await bonCommandeUpdatePage.setUserModifInput('userModif');
    expect(await bonCommandeUpdatePage.getUserModifInput()).to.match(/userModif/);
    await bonCommandeUpdatePage.setDateModifInput('01-01-2001');
    expect(await bonCommandeUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await bonCommandeUpdatePage.depotSelectLastOption();
    await bonCommandeUpdatePage.fournisseurSelectLastOption();
    await waitUntilDisplayed(bonCommandeUpdatePage.saveButton);
    await bonCommandeUpdatePage.save();
    await waitUntilHidden(bonCommandeUpdatePage.saveButton);
    expect(await isVisible(bonCommandeUpdatePage.saveButton)).to.be.false;

    expect(await bonCommandeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(bonCommandeComponentsPage.table);

    await waitUntilCount(bonCommandeComponentsPage.records, beforeRecordsCount + 1);
    expect(await bonCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last BonCommande', async () => {
    const deleteButton = bonCommandeComponentsPage.getDeleteButton(bonCommandeComponentsPage.records.last());
    await click(deleteButton);

    bonCommandeDeleteDialog = new BonCommandeDeleteDialog();
    await waitUntilDisplayed(bonCommandeDeleteDialog.deleteModal);
    expect(await bonCommandeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.bonCommande.delete.question/);
    await bonCommandeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bonCommandeDeleteDialog.deleteModal);

    expect(await isVisible(bonCommandeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([bonCommandeComponentsPage.noRecords, bonCommandeComponentsPage.table]);

    const afterCount = (await isVisible(bonCommandeComponentsPage.noRecords)) ? 0 : await getRecordsCount(bonCommandeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
