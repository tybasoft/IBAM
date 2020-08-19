import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SituationFinanciereComponentsPage, { SituationFinanciereDeleteDialog } from './situation-financiere.page-object';
import SituationFinanciereUpdatePage from './situation-financiere-update.page-object';
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

describe('SituationFinanciere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let situationFinanciereComponentsPage: SituationFinanciereComponentsPage;
  let situationFinanciereUpdatePage: SituationFinanciereUpdatePage;
  /* let situationFinanciereDeleteDialog: SituationFinanciereDeleteDialog; */
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

  it('should load SituationFinancieres', async () => {
    await navBarPage.getEntityPage('situation-financiere');
    situationFinanciereComponentsPage = new SituationFinanciereComponentsPage();
    expect(await situationFinanciereComponentsPage.title.getText()).to.match(/Situation Financieres/);

    expect(await situationFinanciereComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([situationFinanciereComponentsPage.noRecords, situationFinanciereComponentsPage.table]);

    beforeRecordsCount = (await isVisible(situationFinanciereComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(situationFinanciereComponentsPage.table);
  });

  it('should load create SituationFinanciere page', async () => {
    await situationFinanciereComponentsPage.createButton.click();
    situationFinanciereUpdatePage = new SituationFinanciereUpdatePage();
    expect(await situationFinanciereUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ibamApp.situationFinanciere.home.createOrEditLabel/
    );
    await situationFinanciereUpdatePage.cancel();
  });

  /*  it('should create and save SituationFinancieres', async () => {
        await situationFinanciereComponentsPage.createButton.click();
        await situationFinanciereUpdatePage.setMontantFactureInput('montantFacture');
        expect(await situationFinanciereUpdatePage.getMontantFactureInput()).to.match(/montantFacture/);
        await situationFinanciereUpdatePage.setDateFacturationInput('01-01-2001');
        expect(await situationFinanciereUpdatePage.getDateFacturationInput()).to.eq('2001-01-01');
        await situationFinanciereUpdatePage.setMontantEnCoursInput('montantEnCours');
        expect(await situationFinanciereUpdatePage.getMontantEnCoursInput()).to.match(/montantEnCours/);
        await situationFinanciereUpdatePage.projetSelectLastOption();
        await waitUntilDisplayed(situationFinanciereUpdatePage.saveButton);
        await situationFinanciereUpdatePage.save();
        await waitUntilHidden(situationFinanciereUpdatePage.saveButton);
        expect(await isVisible(situationFinanciereUpdatePage.saveButton)).to.be.false;

        expect(await situationFinanciereComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(situationFinanciereComponentsPage.table);

        await waitUntilCount(situationFinanciereComponentsPage.records, beforeRecordsCount + 1);
        expect(await situationFinanciereComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last SituationFinanciere', async () => {

        const deleteButton = situationFinanciereComponentsPage.getDeleteButton(situationFinanciereComponentsPage.records.last());
        await click(deleteButton);

        situationFinanciereDeleteDialog = new SituationFinanciereDeleteDialog();
        await waitUntilDisplayed(situationFinanciereDeleteDialog.deleteModal);
        expect(await situationFinanciereDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.situationFinanciere.delete.question/);
        await situationFinanciereDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(situationFinanciereDeleteDialog.deleteModal);

        expect(await isVisible(situationFinanciereDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([situationFinanciereComponentsPage.noRecords,
        situationFinanciereComponentsPage.table]);
    
        const afterCount = await isVisible(situationFinanciereComponentsPage.noRecords) ? 0 : await getRecordsCount(situationFinanciereComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
