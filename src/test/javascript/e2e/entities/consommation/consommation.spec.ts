import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ConsommationComponentsPage, { ConsommationDeleteDialog } from './consommation.page-object';
import ConsommationUpdatePage from './consommation-update.page-object';
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

describe('Consommation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consommationComponentsPage: ConsommationComponentsPage;
  let consommationUpdatePage: ConsommationUpdatePage;
  let consommationDeleteDialog: ConsommationDeleteDialog;
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

  it('should load Consommations', async () => {
    await navBarPage.getEntityPage('consommation');
    consommationComponentsPage = new ConsommationComponentsPage();
    expect(await consommationComponentsPage.title.getText()).to.match(/Consommations/);

    expect(await consommationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([consommationComponentsPage.noRecords, consommationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(consommationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(consommationComponentsPage.table);
  });

  it('should load create Consommation page', async () => {
    await consommationComponentsPage.createButton.click();
    consommationUpdatePage = new ConsommationUpdatePage();
    expect(await consommationUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.consommation.home.createOrEditLabel/);
    await consommationUpdatePage.cancel();
  });

  it('should create and save Consommations', async () => {
    await consommationComponentsPage.createButton.click();
    await consommationUpdatePage.setReferenceInput('reference');
    expect(await consommationUpdatePage.getReferenceInput()).to.match(/reference/);
    await consommationUpdatePage.setDateAchatInput('01-01-2001');
    expect(await consommationUpdatePage.getDateAchatInput()).to.eq('2001-01-01');
    await consommationUpdatePage.setTypeCarburantInput('typeCarburant');
    expect(await consommationUpdatePage.getTypeCarburantInput()).to.match(/typeCarburant/);
    await consommationUpdatePage.setMontantInput('montant');
    expect(await consommationUpdatePage.getMontantInput()).to.match(/montant/);
    await consommationUpdatePage.setQuantiteInput('quantite');
    expect(await consommationUpdatePage.getQuantiteInput()).to.match(/quantite/);
    await consommationUpdatePage.setKilometrageInput('kilometrage');
    expect(await consommationUpdatePage.getKilometrageInput()).to.match(/kilometrage/);
    await consommationUpdatePage.setCommentaireInput('commentaire');
    expect(await consommationUpdatePage.getCommentaireInput()).to.match(/commentaire/);
    await consommationUpdatePage.setUserModifInput('userModif');
    expect(await consommationUpdatePage.getUserModifInput()).to.match(/userModif/);
    await consommationUpdatePage.setDateModifInput('01-01-2001');
    expect(await consommationUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await consommationUpdatePage.materielSelectLastOption();
    await consommationUpdatePage.fournisseurSelectLastOption();
    await consommationUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(consommationUpdatePage.saveButton);
    await consommationUpdatePage.save();
    await waitUntilHidden(consommationUpdatePage.saveButton);
    expect(await isVisible(consommationUpdatePage.saveButton)).to.be.false;

    expect(await consommationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(consommationComponentsPage.table);

    await waitUntilCount(consommationComponentsPage.records, beforeRecordsCount + 1);
    expect(await consommationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Consommation', async () => {
    const deleteButton = consommationComponentsPage.getDeleteButton(consommationComponentsPage.records.last());
    await click(deleteButton);

    consommationDeleteDialog = new ConsommationDeleteDialog();
    await waitUntilDisplayed(consommationDeleteDialog.deleteModal);
    expect(await consommationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.consommation.delete.question/);
    await consommationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(consommationDeleteDialog.deleteModal);

    expect(await isVisible(consommationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([consommationComponentsPage.noRecords, consommationComponentsPage.table]);

    const afterCount = (await isVisible(consommationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(consommationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
