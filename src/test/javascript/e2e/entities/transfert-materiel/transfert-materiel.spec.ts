import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TransfertMaterielComponentsPage, { TransfertMaterielDeleteDialog } from './transfert-materiel.page-object';
import TransfertMaterielUpdatePage from './transfert-materiel-update.page-object';
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

describe('TransfertMateriel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transfertMaterielComponentsPage: TransfertMaterielComponentsPage;
  let transfertMaterielUpdatePage: TransfertMaterielUpdatePage;
  let transfertMaterielDeleteDialog: TransfertMaterielDeleteDialog;
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

  it('should load TransfertMateriels', async () => {
    await navBarPage.getEntityPage('transfert-materiel');
    transfertMaterielComponentsPage = new TransfertMaterielComponentsPage();
    expect(await transfertMaterielComponentsPage.title.getText()).to.match(/Transfert Materiels/);

    expect(await transfertMaterielComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([transfertMaterielComponentsPage.noRecords, transfertMaterielComponentsPage.table]);

    beforeRecordsCount = (await isVisible(transfertMaterielComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transfertMaterielComponentsPage.table);
  });

  it('should load create TransfertMateriel page', async () => {
    await transfertMaterielComponentsPage.createButton.click();
    transfertMaterielUpdatePage = new TransfertMaterielUpdatePage();
    expect(await transfertMaterielUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ibamApp.transfertMateriel.home.createOrEditLabel/
    );
    await transfertMaterielUpdatePage.cancel();
  });

  it('should create and save TransfertMateriels', async () => {
    await transfertMaterielComponentsPage.createButton.click();
    await transfertMaterielUpdatePage.setReferenceInput('reference');
    expect(await transfertMaterielUpdatePage.getReferenceInput()).to.match(/reference/);
    await transfertMaterielUpdatePage.setDateTransfertInput('01-01-2001');
    expect(await transfertMaterielUpdatePage.getDateTransfertInput()).to.eq('2001-01-01');
    await transfertMaterielUpdatePage.setCommentaireInput('commentaire');
    expect(await transfertMaterielUpdatePage.getCommentaireInput()).to.match(/commentaire/);
    await transfertMaterielUpdatePage.setUserModifInput('userModif');
    expect(await transfertMaterielUpdatePage.getUserModifInput()).to.match(/userModif/);
    await transfertMaterielUpdatePage.setDateModifInput('01-01-2001');
    expect(await transfertMaterielUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await transfertMaterielUpdatePage.materielSelectLastOption();
    await transfertMaterielUpdatePage.projetSelectLastOption();
    await waitUntilDisplayed(transfertMaterielUpdatePage.saveButton);
    await transfertMaterielUpdatePage.save();
    await waitUntilHidden(transfertMaterielUpdatePage.saveButton);
    expect(await isVisible(transfertMaterielUpdatePage.saveButton)).to.be.false;

    expect(await transfertMaterielComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(transfertMaterielComponentsPage.table);

    await waitUntilCount(transfertMaterielComponentsPage.records, beforeRecordsCount + 1);
    expect(await transfertMaterielComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TransfertMateriel', async () => {
    const deleteButton = transfertMaterielComponentsPage.getDeleteButton(transfertMaterielComponentsPage.records.last());
    await click(deleteButton);

    transfertMaterielDeleteDialog = new TransfertMaterielDeleteDialog();
    await waitUntilDisplayed(transfertMaterielDeleteDialog.deleteModal);
    expect(await transfertMaterielDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.transfertMateriel.delete.question/);
    await transfertMaterielDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(transfertMaterielDeleteDialog.deleteModal);

    expect(await isVisible(transfertMaterielDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([transfertMaterielComponentsPage.noRecords, transfertMaterielComponentsPage.table]);

    const afterCount = (await isVisible(transfertMaterielComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transfertMaterielComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
