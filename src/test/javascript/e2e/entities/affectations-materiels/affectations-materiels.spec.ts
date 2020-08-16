import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AffectationsMaterielsComponentsPage, { AffectationsMaterielsDeleteDialog } from './affectations-materiels.page-object';
import AffectationsMaterielsUpdatePage from './affectations-materiels-update.page-object';
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

describe('AffectationsMateriels e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let affectationsMaterielsComponentsPage: AffectationsMaterielsComponentsPage;
  let affectationsMaterielsUpdatePage: AffectationsMaterielsUpdatePage;
  /* let affectationsMaterielsDeleteDialog: AffectationsMaterielsDeleteDialog; */
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

  it('should load AffectationsMateriels', async () => {
    await navBarPage.getEntityPage('affectations-materiels');
    affectationsMaterielsComponentsPage = new AffectationsMaterielsComponentsPage();
    expect(await affectationsMaterielsComponentsPage.title.getText()).to.match(/Affectations Materiels/);

    expect(await affectationsMaterielsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([affectationsMaterielsComponentsPage.noRecords, affectationsMaterielsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(affectationsMaterielsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(affectationsMaterielsComponentsPage.table);
  });

  it('should load create AffectationsMateriels page', async () => {
    await affectationsMaterielsComponentsPage.createButton.click();
    affectationsMaterielsUpdatePage = new AffectationsMaterielsUpdatePage();
    expect(await affectationsMaterielsUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ibamApp.affectationsMateriels.home.createOrEditLabel/
    );
    await affectationsMaterielsUpdatePage.cancel();
  });

  /*  it('should create and save AffectationsMateriels', async () => {
        await affectationsMaterielsComponentsPage.createButton.click();
        await affectationsMaterielsUpdatePage.setDateDebutInput('01-01-2001');
        expect(await affectationsMaterielsUpdatePage.getDateDebutInput()).to.eq('2001-01-01');
        await affectationsMaterielsUpdatePage.setDateFinInput('01-01-2001');
        expect(await affectationsMaterielsUpdatePage.getDateFinInput()).to.eq('2001-01-01');
        await affectationsMaterielsUpdatePage.setDescriptionInput('description');
        expect(await affectationsMaterielsUpdatePage.getDescriptionInput()).to.match(/description/);
        await affectationsMaterielsUpdatePage.projetSelectLastOption();
        await affectationsMaterielsUpdatePage.materielSelectLastOption();
        await waitUntilDisplayed(affectationsMaterielsUpdatePage.saveButton);
        await affectationsMaterielsUpdatePage.save();
        await waitUntilHidden(affectationsMaterielsUpdatePage.saveButton);
        expect(await isVisible(affectationsMaterielsUpdatePage.saveButton)).to.be.false;

        expect(await affectationsMaterielsComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(affectationsMaterielsComponentsPage.table);

        await waitUntilCount(affectationsMaterielsComponentsPage.records, beforeRecordsCount + 1);
        expect(await affectationsMaterielsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last AffectationsMateriels', async () => {

        const deleteButton = affectationsMaterielsComponentsPage.getDeleteButton(affectationsMaterielsComponentsPage.records.last());
        await click(deleteButton);

        affectationsMaterielsDeleteDialog = new AffectationsMaterielsDeleteDialog();
        await waitUntilDisplayed(affectationsMaterielsDeleteDialog.deleteModal);
        expect(await affectationsMaterielsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.affectationsMateriels.delete.question/);
        await affectationsMaterielsDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(affectationsMaterielsDeleteDialog.deleteModal);

        expect(await isVisible(affectationsMaterielsDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([affectationsMaterielsComponentsPage.noRecords,
        affectationsMaterielsComponentsPage.table]);
    
        const afterCount = await isVisible(affectationsMaterielsComponentsPage.noRecords) ? 0 : await getRecordsCount(affectationsMaterielsComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
