import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MaterielComponentsPage, { MaterielDeleteDialog } from './materiel.page-object';
import MaterielUpdatePage from './materiel-update.page-object';
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

describe('Materiel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let materielComponentsPage: MaterielComponentsPage;
  let materielUpdatePage: MaterielUpdatePage;
  let materielDeleteDialog: MaterielDeleteDialog;
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

  it('should load Materiels', async () => {
    await navBarPage.getEntityPage('materiel');
    materielComponentsPage = new MaterielComponentsPage();
    expect(await materielComponentsPage.title.getText()).to.match(/Materiels/);

    expect(await materielComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([materielComponentsPage.noRecords, materielComponentsPage.table]);

    beforeRecordsCount = (await isVisible(materielComponentsPage.noRecords)) ? 0 : await getRecordsCount(materielComponentsPage.table);
  });

  it('should load create Materiel page', async () => {
    await materielComponentsPage.createButton.click();
    materielUpdatePage = new MaterielUpdatePage();
    expect(await materielUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.materiel.home.createOrEditLabel/);
    await materielUpdatePage.cancel();
  });

  it('should create and save Materiels', async () => {
    await materielComponentsPage.createButton.click();
    await materielUpdatePage.setLibelleInput('libelle');
    expect(await materielUpdatePage.getLibelleInput()).to.match(/libelle/);
    await materielUpdatePage.setMatriculeInput('matricule');
    expect(await materielUpdatePage.getMatriculeInput()).to.match(/matricule/);
    await materielUpdatePage.setModeleInput('modele');
    expect(await materielUpdatePage.getModeleInput()).to.match(/modele/);
    await materielUpdatePage.setNumCarteGriseInput('numCarteGrise');
    expect(await materielUpdatePage.getNumCarteGriseInput()).to.match(/numCarteGrise/);
    await materielUpdatePage.setDateIdentificationInput('01-01-2001');
    expect(await materielUpdatePage.getDateIdentificationInput()).to.eq('2001-01-01');
    await materielUpdatePage.setCompteurAchatInput('compteurAchat');
    expect(await materielUpdatePage.getCompteurAchatInput()).to.match(/compteurAchat/);
    await materielUpdatePage.setEtatInput('etat');
    expect(await materielUpdatePage.getEtatInput()).to.match(/etat/);
    const selectedLocation = await materielUpdatePage.getLocationInput().isSelected();
    if (selectedLocation) {
      await materielUpdatePage.getLocationInput().click();
      expect(await materielUpdatePage.getLocationInput().isSelected()).to.be.false;
    } else {
      await materielUpdatePage.getLocationInput().click();
      expect(await materielUpdatePage.getLocationInput().isSelected()).to.be.true;
    }
    await materielUpdatePage.setDescriptionInput('description');
    expect(await materielUpdatePage.getDescriptionInput()).to.match(/description/);
    await materielUpdatePage.setUserModifInput('userModif');
    expect(await materielUpdatePage.getUserModifInput()).to.match(/userModif/);
    await materielUpdatePage.setDateModifInput('01-01-2001');
    expect(await materielUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    const selectedMultiProjet = await materielUpdatePage.getMultiProjetInput().isSelected();
    if (selectedMultiProjet) {
      await materielUpdatePage.getMultiProjetInput().click();
      expect(await materielUpdatePage.getMultiProjetInput().isSelected()).to.be.false;
    } else {
      await materielUpdatePage.getMultiProjetInput().click();
      expect(await materielUpdatePage.getMultiProjetInput().isSelected()).to.be.true;
    }
    await materielUpdatePage.familleSelectLastOption();
    await materielUpdatePage.typeMaterielSelectLastOption();
    await materielUpdatePage.fournisseurSelectLastOption();
    await materielUpdatePage.marqueSelectLastOption();
    await materielUpdatePage.documentSelectLastOption();
    await materielUpdatePage.employeSelectLastOption();
    await materielUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(materielUpdatePage.saveButton);
    await materielUpdatePage.save();
    await waitUntilHidden(materielUpdatePage.saveButton);
    expect(await isVisible(materielUpdatePage.saveButton)).to.be.false;

    expect(await materielComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(materielComponentsPage.table);

    await waitUntilCount(materielComponentsPage.records, beforeRecordsCount + 1);
    expect(await materielComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Materiel', async () => {
    const deleteButton = materielComponentsPage.getDeleteButton(materielComponentsPage.records.last());
    await click(deleteButton);

    materielDeleteDialog = new MaterielDeleteDialog();
    await waitUntilDisplayed(materielDeleteDialog.deleteModal);
    expect(await materielDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.materiel.delete.question/);
    await materielDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(materielDeleteDialog.deleteModal);

    expect(await isVisible(materielDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([materielComponentsPage.noRecords, materielComponentsPage.table]);

    const afterCount = (await isVisible(materielComponentsPage.noRecords)) ? 0 : await getRecordsCount(materielComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
