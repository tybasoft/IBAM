import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeComponentsPage, { EmployeDeleteDialog } from './employe.page-object';
import EmployeUpdatePage from './employe-update.page-object';
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

describe('Employe e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeComponentsPage: EmployeComponentsPage;
  let employeUpdatePage: EmployeUpdatePage;
  let employeDeleteDialog: EmployeDeleteDialog;
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

  it('should load Employes', async () => {
    await navBarPage.getEntityPage('employe');
    employeComponentsPage = new EmployeComponentsPage();
    expect(await employeComponentsPage.title.getText()).to.match(/Employes/);

    expect(await employeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([employeComponentsPage.noRecords, employeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(employeComponentsPage.noRecords)) ? 0 : await getRecordsCount(employeComponentsPage.table);
  });

  it('should load create Employe page', async () => {
    await employeComponentsPage.createButton.click();
    employeUpdatePage = new EmployeUpdatePage();
    expect(await employeUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.employe.home.createOrEditLabel/);
    await employeUpdatePage.cancel();
  });

  it('should create and save Employes', async () => {
    await employeComponentsPage.createButton.click();
    await employeUpdatePage.setNomInput('nom');
    expect(await employeUpdatePage.getNomInput()).to.match(/nom/);
    await employeUpdatePage.setPrenomInput('prenom');
    expect(await employeUpdatePage.getPrenomInput()).to.match(/prenom/);
    await employeUpdatePage.setMatriculeInput('matricule');
    expect(await employeUpdatePage.getMatriculeInput()).to.match(/matricule/);
    await employeUpdatePage.setCinInput('cin');
    expect(await employeUpdatePage.getCinInput()).to.match(/cin/);
    await employeUpdatePage.setSexeInput('sexe');
    expect(await employeUpdatePage.getSexeInput()).to.match(/sexe/);
    await employeUpdatePage.setTarifJournalierInput('tarifJournalier');
    expect(await employeUpdatePage.getTarifJournalierInput()).to.match(/tarifJournalier/);
    await employeUpdatePage.setDateNaissanceInput('01-01-2001');
    expect(await employeUpdatePage.getDateNaissanceInput()).to.eq('2001-01-01');
    await employeUpdatePage.setLieuNaissanceInput('lieuNaissance');
    expect(await employeUpdatePage.getLieuNaissanceInput()).to.match(/lieuNaissance/);
    await employeUpdatePage.setSituationFamInput('situationFam');
    expect(await employeUpdatePage.getSituationFamInput()).to.match(/situationFam/);
    await employeUpdatePage.setNationaliteInput('nationalite');
    expect(await employeUpdatePage.getNationaliteInput()).to.match(/nationalite/);
    await employeUpdatePage.setDateEntreeInput('01-01-2001');
    expect(await employeUpdatePage.getDateEntreeInput()).to.eq('2001-01-01');
    await employeUpdatePage.setTelInput('tel');
    expect(await employeUpdatePage.getTelInput()).to.match(/tel/);
    await employeUpdatePage.setEmailInput('email');
    expect(await employeUpdatePage.getEmailInput()).to.match(/email/);
    await employeUpdatePage.setAdresseInput('adresse');
    expect(await employeUpdatePage.getAdresseInput()).to.match(/adresse/);
    await employeUpdatePage.setDivisionInput('division');
    expect(await employeUpdatePage.getDivisionInput()).to.match(/division/);
    await employeUpdatePage.setTypeContratInput('typeContrat');
    expect(await employeUpdatePage.getTypeContratInput()).to.match(/typeContrat/);
    const selectedMultiPorjet = await employeUpdatePage.getMultiPorjetInput().isSelected();
    if (selectedMultiPorjet) {
      await employeUpdatePage.getMultiPorjetInput().click();
      expect(await employeUpdatePage.getMultiPorjetInput().isSelected()).to.be.false;
    } else {
      await employeUpdatePage.getMultiPorjetInput().click();
      expect(await employeUpdatePage.getMultiPorjetInput().isSelected()).to.be.true;
    }
    await employeUpdatePage.setDateDepartInput('01-01-2001');
    expect(await employeUpdatePage.getDateDepartInput()).to.eq('2001-01-01');
    await employeUpdatePage.setMotifDepartInput('motifDepart');
    expect(await employeUpdatePage.getMotifDepartInput()).to.match(/motifDepart/);
    await employeUpdatePage.setUserModifInput('userModif');
    expect(await employeUpdatePage.getUserModifInput()).to.match(/userModif/);
    await employeUpdatePage.setDateModifInput('01-01-2001');
    expect(await employeUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await employeUpdatePage.projetSelectLastOption();
    await employeUpdatePage.equipeSelectLastOption();
    await employeUpdatePage.fonctionSelectLastOption();
    await employeUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(employeUpdatePage.saveButton);
    await employeUpdatePage.save();
    await waitUntilHidden(employeUpdatePage.saveButton);
    expect(await isVisible(employeUpdatePage.saveButton)).to.be.false;

    expect(await employeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(employeComponentsPage.table);

    await waitUntilCount(employeComponentsPage.records, beforeRecordsCount + 1);
    expect(await employeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Employe', async () => {
    const deleteButton = employeComponentsPage.getDeleteButton(employeComponentsPage.records.last());
    await click(deleteButton);

    employeDeleteDialog = new EmployeDeleteDialog();
    await waitUntilDisplayed(employeDeleteDialog.deleteModal);
    expect(await employeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.employe.delete.question/);
    await employeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeDeleteDialog.deleteModal);

    expect(await isVisible(employeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([employeComponentsPage.noRecords, employeComponentsPage.table]);

    const afterCount = (await isVisible(employeComponentsPage.noRecords)) ? 0 : await getRecordsCount(employeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
