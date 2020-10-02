import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EntrepriseComponentsPage, { EntrepriseDeleteDialog } from './entreprise.page-object';
import EntrepriseUpdatePage from './entreprise-update.page-object';
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

describe('Entreprise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entrepriseComponentsPage: EntrepriseComponentsPage;
  let entrepriseUpdatePage: EntrepriseUpdatePage;
  let entrepriseDeleteDialog: EntrepriseDeleteDialog;
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

  it('should load Entreprises', async () => {
    await navBarPage.getEntityPage('entreprise');
    entrepriseComponentsPage = new EntrepriseComponentsPage();
    expect(await entrepriseComponentsPage.title.getText()).to.match(/Entreprises/);

    expect(await entrepriseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([entrepriseComponentsPage.noRecords, entrepriseComponentsPage.table]);

    beforeRecordsCount = (await isVisible(entrepriseComponentsPage.noRecords)) ? 0 : await getRecordsCount(entrepriseComponentsPage.table);
  });

  it('should load create Entreprise page', async () => {
    await entrepriseComponentsPage.createButton.click();
    entrepriseUpdatePage = new EntrepriseUpdatePage();
    expect(await entrepriseUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.entreprise.home.createOrEditLabel/);
    await entrepriseUpdatePage.cancel();
  });

  it('should create and save Entreprises', async () => {
    await entrepriseComponentsPage.createButton.click();
    await entrepriseUpdatePage.setEntiteJuridiqueInput('entiteJuridique');
    expect(await entrepriseUpdatePage.getEntiteJuridiqueInput()).to.match(/entiteJuridique/);
    await entrepriseUpdatePage.setNomCommercialInput('nomCommercial');
    expect(await entrepriseUpdatePage.getNomCommercialInput()).to.match(/nomCommercial/);
    await entrepriseUpdatePage.setAdresseInput('adresse');
    expect(await entrepriseUpdatePage.getAdresseInput()).to.match(/adresse/);
    await entrepriseUpdatePage.setCapitalInput('capital');
    expect(await entrepriseUpdatePage.getCapitalInput()).to.match(/capital/);
    await entrepriseUpdatePage.setDirectionInput('direction');
    expect(await entrepriseUpdatePage.getDirectionInput()).to.match(/direction/);
    await entrepriseUpdatePage.setActiviteInput('activite');
    expect(await entrepriseUpdatePage.getActiviteInput()).to.match(/activite/);
    await entrepriseUpdatePage.setTelephoneInput('telephone');
    expect(await entrepriseUpdatePage.getTelephoneInput()).to.match(/telephone/);
    await entrepriseUpdatePage.setEmailInput('email');
    expect(await entrepriseUpdatePage.getEmailInput()).to.match(/email/);
    await entrepriseUpdatePage.setUserModifInput('userModif');
    expect(await entrepriseUpdatePage.getUserModifInput()).to.match(/userModif/);
    await entrepriseUpdatePage.setDateModifInput('01-01-2001');
    expect(await entrepriseUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await entrepriseUpdatePage.imageSelectLastOption();
    await waitUntilDisplayed(entrepriseUpdatePage.saveButton);
    await entrepriseUpdatePage.save();
    await waitUntilHidden(entrepriseUpdatePage.saveButton);
    expect(await isVisible(entrepriseUpdatePage.saveButton)).to.be.false;

    expect(await entrepriseComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(entrepriseComponentsPage.table);

    await waitUntilCount(entrepriseComponentsPage.records, beforeRecordsCount + 1);
    expect(await entrepriseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Entreprise', async () => {
    const deleteButton = entrepriseComponentsPage.getDeleteButton(entrepriseComponentsPage.records.last());
    await click(deleteButton);

    entrepriseDeleteDialog = new EntrepriseDeleteDialog();
    await waitUntilDisplayed(entrepriseDeleteDialog.deleteModal);
    expect(await entrepriseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.entreprise.delete.question/);
    await entrepriseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(entrepriseDeleteDialog.deleteModal);

    expect(await isVisible(entrepriseDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([entrepriseComponentsPage.noRecords, entrepriseComponentsPage.table]);

    const afterCount = (await isVisible(entrepriseComponentsPage.noRecords)) ? 0 : await getRecordsCount(entrepriseComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
