import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ImageComponentsPage, { ImageDeleteDialog } from './image.page-object';
import ImageUpdatePage from './image-update.page-object';
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

describe('Image e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imageComponentsPage: ImageComponentsPage;
  let imageUpdatePage: ImageUpdatePage;
  let imageDeleteDialog: ImageDeleteDialog;
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

  it('should load Images', async () => {
    await navBarPage.getEntityPage('image');
    imageComponentsPage = new ImageComponentsPage();
    expect(await imageComponentsPage.title.getText()).to.match(/Images/);

    expect(await imageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([imageComponentsPage.noRecords, imageComponentsPage.table]);

    beforeRecordsCount = (await isVisible(imageComponentsPage.noRecords)) ? 0 : await getRecordsCount(imageComponentsPage.table);
  });

  it('should load create Image page', async () => {
    await imageComponentsPage.createButton.click();
    imageUpdatePage = new ImageUpdatePage();
    expect(await imageUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.image.home.createOrEditLabel/);
    await imageUpdatePage.cancel();
  });

  it('should create and save Images', async () => {
    await imageComponentsPage.createButton.click();
    await imageUpdatePage.setTitreInput('titre');
    expect(await imageUpdatePage.getTitreInput()).to.match(/titre/);
    await imageUpdatePage.setPathInput('path');
    expect(await imageUpdatePage.getPathInput()).to.match(/path/);
    await imageUpdatePage.setUserModifInput('userModif');
    expect(await imageUpdatePage.getUserModifInput()).to.match(/userModif/);
    await imageUpdatePage.setDateModifInput('01-01-2001');
    expect(await imageUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(imageUpdatePage.saveButton);
    await imageUpdatePage.save();
    await waitUntilHidden(imageUpdatePage.saveButton);
    expect(await isVisible(imageUpdatePage.saveButton)).to.be.false;

    expect(await imageComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(imageComponentsPage.table);

    await waitUntilCount(imageComponentsPage.records, beforeRecordsCount + 1);
    expect(await imageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Image', async () => {
    const deleteButton = imageComponentsPage.getDeleteButton(imageComponentsPage.records.last());
    await click(deleteButton);

    imageDeleteDialog = new ImageDeleteDialog();
    await waitUntilDisplayed(imageDeleteDialog.deleteModal);
    expect(await imageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.image.delete.question/);
    await imageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(imageDeleteDialog.deleteModal);

    expect(await isVisible(imageDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([imageComponentsPage.noRecords, imageComponentsPage.table]);

    const afterCount = (await isVisible(imageComponentsPage.noRecords)) ? 0 : await getRecordsCount(imageComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
