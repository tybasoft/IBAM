import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FournisseurComponentsPage, { FournisseurDeleteDialog } from './fournisseur.page-object';
import FournisseurUpdatePage from './fournisseur-update.page-object';
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

describe('Fournisseur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fournisseurComponentsPage: FournisseurComponentsPage;
  let fournisseurUpdatePage: FournisseurUpdatePage;
  let fournisseurDeleteDialog: FournisseurDeleteDialog;
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

  it('should load Fournisseurs', async () => {
    await navBarPage.getEntityPage('fournisseur');
    fournisseurComponentsPage = new FournisseurComponentsPage();
    expect(await fournisseurComponentsPage.title.getText()).to.match(/Fournisseurs/);

    expect(await fournisseurComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([fournisseurComponentsPage.noRecords, fournisseurComponentsPage.table]);

    beforeRecordsCount = (await isVisible(fournisseurComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fournisseurComponentsPage.table);
  });

  it('should load create Fournisseur page', async () => {
    await fournisseurComponentsPage.createButton.click();
    fournisseurUpdatePage = new FournisseurUpdatePage();
    expect(await fournisseurUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.fournisseur.home.createOrEditLabel/);
    await fournisseurUpdatePage.cancel();
  });

  it('should create and save Fournisseurs', async () => {
    await fournisseurComponentsPage.createButton.click();
    await fournisseurUpdatePage.setNomCommercialInput('nomCommercial');
    expect(await fournisseurUpdatePage.getNomCommercialInput()).to.match(/nomCommercial/);
    await fournisseurUpdatePage.setTypeInput('type');
    expect(await fournisseurUpdatePage.getTypeInput()).to.match(/type/);
    await fournisseurUpdatePage.setFaxInput('fax');
    expect(await fournisseurUpdatePage.getFaxInput()).to.match(/fax/);
    await fournisseurUpdatePage.setNomInput('nom');
    expect(await fournisseurUpdatePage.getNomInput()).to.match(/nom/);
    await fournisseurUpdatePage.setPrenomInput('prenom');
    expect(await fournisseurUpdatePage.getPrenomInput()).to.match(/prenom/);
    await fournisseurUpdatePage.setEmailInput('email');
    expect(await fournisseurUpdatePage.getEmailInput()).to.match(/email/);
    await fournisseurUpdatePage.setTelInput('tel');
    expect(await fournisseurUpdatePage.getTelInput()).to.match(/tel/);
    await fournisseurUpdatePage.setAdresseInput('adresse');
    expect(await fournisseurUpdatePage.getAdresseInput()).to.match(/adresse/);
    await fournisseurUpdatePage.setDescriptionInput('description');
    expect(await fournisseurUpdatePage.getDescriptionInput()).to.match(/description/);
    await fournisseurUpdatePage.setUserModifInput('userModif');
    expect(await fournisseurUpdatePage.getUserModifInput()).to.match(/userModif/);
    await fournisseurUpdatePage.setDateModifInput('01-01-2001');
    expect(await fournisseurUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(fournisseurUpdatePage.saveButton);
    await fournisseurUpdatePage.save();
    await waitUntilHidden(fournisseurUpdatePage.saveButton);
    expect(await isVisible(fournisseurUpdatePage.saveButton)).to.be.false;

    expect(await fournisseurComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(fournisseurComponentsPage.table);

    await waitUntilCount(fournisseurComponentsPage.records, beforeRecordsCount + 1);
    expect(await fournisseurComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Fournisseur', async () => {
    const deleteButton = fournisseurComponentsPage.getDeleteButton(fournisseurComponentsPage.records.last());
    await click(deleteButton);

    fournisseurDeleteDialog = new FournisseurDeleteDialog();
    await waitUntilDisplayed(fournisseurDeleteDialog.deleteModal);
    expect(await fournisseurDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.fournisseur.delete.question/);
    await fournisseurDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fournisseurDeleteDialog.deleteModal);

    expect(await isVisible(fournisseurDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([fournisseurComponentsPage.noRecords, fournisseurComponentsPage.table]);

    const afterCount = (await isVisible(fournisseurComponentsPage.noRecords)) ? 0 : await getRecordsCount(fournisseurComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
