import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProjetComponentsPage, { ProjetDeleteDialog } from './projet.page-object';
import ProjetUpdatePage from './projet-update.page-object';
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

describe('Projet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projetComponentsPage: ProjetComponentsPage;
  let projetUpdatePage: ProjetUpdatePage;
  let projetDeleteDialog: ProjetDeleteDialog;
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

  it('should load Projets', async () => {
    await navBarPage.getEntityPage('projet');
    projetComponentsPage = new ProjetComponentsPage();
    expect(await projetComponentsPage.title.getText()).to.match(/Projets/);

    expect(await projetComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([projetComponentsPage.noRecords, projetComponentsPage.table]);

    beforeRecordsCount = (await isVisible(projetComponentsPage.noRecords)) ? 0 : await getRecordsCount(projetComponentsPage.table);
  });

  it('should load create Projet page', async () => {
    await projetComponentsPage.createButton.click();
    projetUpdatePage = new ProjetUpdatePage();
    expect(await projetUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.projet.home.createOrEditLabel/);
    await projetUpdatePage.cancel();
  });

  it('should create and save Projets', async () => {
    await projetComponentsPage.createButton.click();
    await projetUpdatePage.setReferenceInput('reference');
    expect(await projetUpdatePage.getReferenceInput()).to.match(/reference/);
    await projetUpdatePage.setLibelleInput('libelle');
    expect(await projetUpdatePage.getLibelleInput()).to.match(/libelle/);
    await projetUpdatePage.setDescriptionInput('description');
    expect(await projetUpdatePage.getDescriptionInput()).to.match(/description/);
    await projetUpdatePage.setDateDebutInput('01-01-2001');
    expect(await projetUpdatePage.getDateDebutInput()).to.eq('2001-01-01');
    await projetUpdatePage.setDateFinInput('01-01-2001');
    expect(await projetUpdatePage.getDateFinInput()).to.eq('2001-01-01');
    await projetUpdatePage.setNbrEmployeInput('nbrEmploye');
    expect(await projetUpdatePage.getNbrEmployeInput()).to.match(/nbrEmploye/);
    await projetUpdatePage.setBudgetInput('budget');
    expect(await projetUpdatePage.getBudgetInput()).to.match(/budget/);
    await projetUpdatePage.setAdresseInput('adresse');
    expect(await projetUpdatePage.getAdresseInput()).to.match(/adresse/);
    await projetUpdatePage.setVilleInput('ville');
    expect(await projetUpdatePage.getVilleInput()).to.match(/ville/);
    await projetUpdatePage.setPaysInput('pays');
    expect(await projetUpdatePage.getPaysInput()).to.match(/pays/);
    await projetUpdatePage.setUserModifInput('userModif');
    expect(await projetUpdatePage.getUserModifInput()).to.match(/userModif/);
    await projetUpdatePage.setDateModifInput('01-01-2001');
    expect(await projetUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await projetUpdatePage.entrepriseSelectLastOption();
    await projetUpdatePage.horaireSelectLastOption();
    await projetUpdatePage.depotSelectLastOption();
    await waitUntilDisplayed(projetUpdatePage.saveButton);
    await projetUpdatePage.save();
    await waitUntilHidden(projetUpdatePage.saveButton);
    expect(await isVisible(projetUpdatePage.saveButton)).to.be.false;

    expect(await projetComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(projetComponentsPage.table);

    await waitUntilCount(projetComponentsPage.records, beforeRecordsCount + 1);
    expect(await projetComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Projet', async () => {
    const deleteButton = projetComponentsPage.getDeleteButton(projetComponentsPage.records.last());
    await click(deleteButton);

    projetDeleteDialog = new ProjetDeleteDialog();
    await waitUntilDisplayed(projetDeleteDialog.deleteModal);
    expect(await projetDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.projet.delete.question/);
    await projetDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(projetDeleteDialog.deleteModal);

    expect(await isVisible(projetDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([projetComponentsPage.noRecords, projetComponentsPage.table]);

    const afterCount = (await isVisible(projetComponentsPage.noRecords)) ? 0 : await getRecordsCount(projetComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
