import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DocumentComponentsPage, { DocumentDeleteDialog } from './document.page-object';
import DocumentUpdatePage from './document-update.page-object';
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

describe('Document e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentComponentsPage: DocumentComponentsPage;
  let documentUpdatePage: DocumentUpdatePage;
  let documentDeleteDialog: DocumentDeleteDialog;
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

  it('should load Documents', async () => {
    await navBarPage.getEntityPage('document');
    documentComponentsPage = new DocumentComponentsPage();
    expect(await documentComponentsPage.title.getText()).to.match(/Documents/);

    expect(await documentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([documentComponentsPage.noRecords, documentComponentsPage.table]);

    beforeRecordsCount = (await isVisible(documentComponentsPage.noRecords)) ? 0 : await getRecordsCount(documentComponentsPage.table);
  });

  it('should load create Document page', async () => {
    await documentComponentsPage.createButton.click();
    documentUpdatePage = new DocumentUpdatePage();
    expect(await documentUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.document.home.createOrEditLabel/);
    await documentUpdatePage.cancel();
  });

  it('should create and save Documents', async () => {
    await documentComponentsPage.createButton.click();
    await documentUpdatePage.setTitreInput('titre');
    expect(await documentUpdatePage.getTitreInput()).to.match(/titre/);
    await documentUpdatePage.setTypeInput('type');
    expect(await documentUpdatePage.getTypeInput()).to.match(/type/);
    await documentUpdatePage.setPathInput('path');
    expect(await documentUpdatePage.getPathInput()).to.match(/path/);
    await documentUpdatePage.setCommentaireInput('commentaire');
    expect(await documentUpdatePage.getCommentaireInput()).to.match(/commentaire/);
    await documentUpdatePage.setUserModifInput('userModif');
    expect(await documentUpdatePage.getUserModifInput()).to.match(/userModif/);
    await documentUpdatePage.setDateModifInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await documentUpdatePage.getDateModifInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(documentUpdatePage.saveButton);
    await documentUpdatePage.save();
    await waitUntilHidden(documentUpdatePage.saveButton);
    expect(await isVisible(documentUpdatePage.saveButton)).to.be.false;

    expect(await documentComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(documentComponentsPage.table);

    await waitUntilCount(documentComponentsPage.records, beforeRecordsCount + 1);
    expect(await documentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Document', async () => {
    const deleteButton = documentComponentsPage.getDeleteButton(documentComponentsPage.records.last());
    await click(deleteButton);

    documentDeleteDialog = new DocumentDeleteDialog();
    await waitUntilDisplayed(documentDeleteDialog.deleteModal);
    expect(await documentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.document.delete.question/);
    await documentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(documentDeleteDialog.deleteModal);

    expect(await isVisible(documentDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([documentComponentsPage.noRecords, documentComponentsPage.table]);

    const afterCount = (await isVisible(documentComponentsPage.noRecords)) ? 0 : await getRecordsCount(documentComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
