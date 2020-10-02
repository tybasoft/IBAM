import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VisiteTechniqueComponentsPage, { VisiteTechniqueDeleteDialog } from './visite-technique.page-object';
import VisiteTechniqueUpdatePage from './visite-technique-update.page-object';
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

describe('VisiteTechnique e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visiteTechniqueComponentsPage: VisiteTechniqueComponentsPage;
  let visiteTechniqueUpdatePage: VisiteTechniqueUpdatePage;
  let visiteTechniqueDeleteDialog: VisiteTechniqueDeleteDialog;
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

  it('should load VisiteTechniques', async () => {
    await navBarPage.getEntityPage('visite-technique');
    visiteTechniqueComponentsPage = new VisiteTechniqueComponentsPage();
    expect(await visiteTechniqueComponentsPage.title.getText()).to.match(/Visite Techniques/);

    expect(await visiteTechniqueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([visiteTechniqueComponentsPage.noRecords, visiteTechniqueComponentsPage.table]);

    beforeRecordsCount = (await isVisible(visiteTechniqueComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(visiteTechniqueComponentsPage.table);
  });

  it('should load create VisiteTechnique page', async () => {
    await visiteTechniqueComponentsPage.createButton.click();
    visiteTechniqueUpdatePage = new VisiteTechniqueUpdatePage();
    expect(await visiteTechniqueUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.visiteTechnique.home.createOrEditLabel/);
    await visiteTechniqueUpdatePage.cancel();
  });

  it('should create and save VisiteTechniques', async () => {
    await visiteTechniqueComponentsPage.createButton.click();
    await visiteTechniqueUpdatePage.setReferenceInput('reference');
    expect(await visiteTechniqueUpdatePage.getReferenceInput()).to.match(/reference/);
    await visiteTechniqueUpdatePage.setDateVisiteInput('01-01-2001');
    expect(await visiteTechniqueUpdatePage.getDateVisiteInput()).to.eq('2001-01-01');
    await visiteTechniqueUpdatePage.setRemarqueInput('remarque');
    expect(await visiteTechniqueUpdatePage.getRemarqueInput()).to.match(/remarque/);
    await visiteTechniqueUpdatePage.setUserModifInput('userModif');
    expect(await visiteTechniqueUpdatePage.getUserModifInput()).to.match(/userModif/);
    await visiteTechniqueUpdatePage.setDateModifInput('01-01-2001');
    expect(await visiteTechniqueUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await visiteTechniqueUpdatePage.materielSelectLastOption();
    await waitUntilDisplayed(visiteTechniqueUpdatePage.saveButton);
    await visiteTechniqueUpdatePage.save();
    await waitUntilHidden(visiteTechniqueUpdatePage.saveButton);
    expect(await isVisible(visiteTechniqueUpdatePage.saveButton)).to.be.false;

    expect(await visiteTechniqueComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(visiteTechniqueComponentsPage.table);

    await waitUntilCount(visiteTechniqueComponentsPage.records, beforeRecordsCount + 1);
    expect(await visiteTechniqueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last VisiteTechnique', async () => {
    const deleteButton = visiteTechniqueComponentsPage.getDeleteButton(visiteTechniqueComponentsPage.records.last());
    await click(deleteButton);

    visiteTechniqueDeleteDialog = new VisiteTechniqueDeleteDialog();
    await waitUntilDisplayed(visiteTechniqueDeleteDialog.deleteModal);
    expect(await visiteTechniqueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.visiteTechnique.delete.question/);
    await visiteTechniqueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(visiteTechniqueDeleteDialog.deleteModal);

    expect(await isVisible(visiteTechniqueDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([visiteTechniqueComponentsPage.noRecords, visiteTechniqueComponentsPage.table]);

    const afterCount = (await isVisible(visiteTechniqueComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(visiteTechniqueComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
