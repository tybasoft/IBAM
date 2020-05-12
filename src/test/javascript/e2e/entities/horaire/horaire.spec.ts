import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import HoraireComponentsPage, { HoraireDeleteDialog } from './horaire.page-object';
import HoraireUpdatePage from './horaire-update.page-object';
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

describe('Horaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let horaireComponentsPage: HoraireComponentsPage;
  let horaireUpdatePage: HoraireUpdatePage;
  let horaireDeleteDialog: HoraireDeleteDialog;
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

  it('should load Horaires', async () => {
    await navBarPage.getEntityPage('horaire');
    horaireComponentsPage = new HoraireComponentsPage();
    expect(await horaireComponentsPage.title.getText()).to.match(/Horaires/);

    expect(await horaireComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([horaireComponentsPage.noRecords, horaireComponentsPage.table]);

    beforeRecordsCount = (await isVisible(horaireComponentsPage.noRecords)) ? 0 : await getRecordsCount(horaireComponentsPage.table);
  });

  it('should load create Horaire page', async () => {
    await horaireComponentsPage.createButton.click();
    horaireUpdatePage = new HoraireUpdatePage();
    expect(await horaireUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.horaire.home.createOrEditLabel/);
    await horaireUpdatePage.cancel();
  });

  it('should create and save Horaires', async () => {
    await horaireComponentsPage.createButton.click();
    await horaireUpdatePage.setLibelleInput('libelle');
    expect(await horaireUpdatePage.getLibelleInput()).to.match(/libelle/);
    await horaireUpdatePage.setNbrHeurParJrInput('nbrHeurParJr');
    expect(await horaireUpdatePage.getNbrHeurParJrInput()).to.match(/nbrHeurParJr/);
    await horaireUpdatePage.setNbrJourParSemInput('nbrJourParSem');
    expect(await horaireUpdatePage.getNbrJourParSemInput()).to.match(/nbrJourParSem/);
    await horaireUpdatePage.setHeureDebutJrInput('heureDebutJr');
    expect(await horaireUpdatePage.getHeureDebutJrInput()).to.match(/heureDebutJr/);
    await horaireUpdatePage.setHeureFinJrInput('heureFinJr');
    expect(await horaireUpdatePage.getHeureFinJrInput()).to.match(/heureFinJr/);
    await horaireUpdatePage.setDureePauseInput('dureePause');
    expect(await horaireUpdatePage.getDureePauseInput()).to.match(/dureePause/);
    await horaireUpdatePage.setUserModifInput('userModif');
    expect(await horaireUpdatePage.getUserModifInput()).to.match(/userModif/);
    await horaireUpdatePage.setDateModifInput('01-01-2001');
    expect(await horaireUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(horaireUpdatePage.saveButton);
    await horaireUpdatePage.save();
    await waitUntilHidden(horaireUpdatePage.saveButton);
    expect(await isVisible(horaireUpdatePage.saveButton)).to.be.false;

    expect(await horaireComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(horaireComponentsPage.table);

    await waitUntilCount(horaireComponentsPage.records, beforeRecordsCount + 1);
    expect(await horaireComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Horaire', async () => {
    const deleteButton = horaireComponentsPage.getDeleteButton(horaireComponentsPage.records.last());
    await click(deleteButton);

    horaireDeleteDialog = new HoraireDeleteDialog();
    await waitUntilDisplayed(horaireDeleteDialog.deleteModal);
    expect(await horaireDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.horaire.delete.question/);
    await horaireDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(horaireDeleteDialog.deleteModal);

    expect(await isVisible(horaireDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([horaireComponentsPage.noRecords, horaireComponentsPage.table]);

    const afterCount = (await isVisible(horaireComponentsPage.noRecords)) ? 0 : await getRecordsCount(horaireComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
