import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EquipeComponentsPage, { EquipeDeleteDialog } from './equipe.page-object';
import EquipeUpdatePage from './equipe-update.page-object';
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

describe('Equipe e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let equipeComponentsPage: EquipeComponentsPage;
  let equipeUpdatePage: EquipeUpdatePage;
  let equipeDeleteDialog: EquipeDeleteDialog;
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

  it('should load Equipes', async () => {
    await navBarPage.getEntityPage('equipe');
    equipeComponentsPage = new EquipeComponentsPage();
    expect(await equipeComponentsPage.title.getText()).to.match(/Equipes/);

    expect(await equipeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([equipeComponentsPage.noRecords, equipeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(equipeComponentsPage.noRecords)) ? 0 : await getRecordsCount(equipeComponentsPage.table);
  });

  it('should load create Equipe page', async () => {
    await equipeComponentsPage.createButton.click();
    equipeUpdatePage = new EquipeUpdatePage();
    expect(await equipeUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.equipe.home.createOrEditLabel/);
    await equipeUpdatePage.cancel();
  });

  it('should create and save Equipes', async () => {
    await equipeComponentsPage.createButton.click();
    await equipeUpdatePage.setLibelleInput('libelle');
    expect(await equipeUpdatePage.getLibelleInput()).to.match(/libelle/);
    await equipeUpdatePage.setUserModifInput('userModif');
    expect(await equipeUpdatePage.getUserModifInput()).to.match(/userModif/);
    await equipeUpdatePage.setDateModifInput('01-01-2001');
    expect(await equipeUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await equipeUpdatePage.projetSelectLastOption();
    await equipeUpdatePage.equipeSelectLastOption();
    await waitUntilDisplayed(equipeUpdatePage.saveButton);
    await equipeUpdatePage.save();
    await waitUntilHidden(equipeUpdatePage.saveButton);
    expect(await isVisible(equipeUpdatePage.saveButton)).to.be.false;

    expect(await equipeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(equipeComponentsPage.table);

    await waitUntilCount(equipeComponentsPage.records, beforeRecordsCount + 1);
    expect(await equipeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Equipe', async () => {
    const deleteButton = equipeComponentsPage.getDeleteButton(equipeComponentsPage.records.last());
    await click(deleteButton);

    equipeDeleteDialog = new EquipeDeleteDialog();
    await waitUntilDisplayed(equipeDeleteDialog.deleteModal);
    expect(await equipeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.equipe.delete.question/);
    await equipeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(equipeDeleteDialog.deleteModal);

    expect(await isVisible(equipeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([equipeComponentsPage.noRecords, equipeComponentsPage.table]);

    const afterCount = (await isVisible(equipeComponentsPage.noRecords)) ? 0 : await getRecordsCount(equipeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
