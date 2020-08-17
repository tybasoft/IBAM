import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AvancementComponentsPage, { AvancementDeleteDialog } from './avancement.page-object';
import AvancementUpdatePage from './avancement-update.page-object';
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

describe('Avancement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let avancementComponentsPage: AvancementComponentsPage;
  let avancementUpdatePage: AvancementUpdatePage;
  let avancementDeleteDialog: AvancementDeleteDialog;
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

  it('should load Avancements', async () => {
    await navBarPage.getEntityPage('avancement');
    avancementComponentsPage = new AvancementComponentsPage();
    expect(await avancementComponentsPage.title.getText()).to.match(/Avancements/);

    expect(await avancementComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([avancementComponentsPage.noRecords, avancementComponentsPage.table]);

    beforeRecordsCount = (await isVisible(avancementComponentsPage.noRecords)) ? 0 : await getRecordsCount(avancementComponentsPage.table);
  });

  it('should load create Avancement page', async () => {
    await avancementComponentsPage.createButton.click();
    avancementUpdatePage = new AvancementUpdatePage();
    expect(await avancementUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.avancement.home.createOrEditLabel/);
    await avancementUpdatePage.cancel();
  });

  it('should create and save Avancements', async () => {
    await avancementComponentsPage.createButton.click();
    await avancementUpdatePage.setCreatedAtInput('01-01-2001');
    expect(await avancementUpdatePage.getCreatedAtInput()).to.eq('2001-01-01');
    await avancementUpdatePage.setUpdatedAtInput('01-01-2001');
    expect(await avancementUpdatePage.getUpdatedAtInput()).to.eq('2001-01-01');
    await avancementUpdatePage.compteRenduSelectLastOption();
    await waitUntilDisplayed(avancementUpdatePage.saveButton);
    await avancementUpdatePage.save();
    await waitUntilHidden(avancementUpdatePage.saveButton);
    expect(await isVisible(avancementUpdatePage.saveButton)).to.be.false;

    expect(await avancementComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(avancementComponentsPage.table);

    await waitUntilCount(avancementComponentsPage.records, beforeRecordsCount + 1);
    expect(await avancementComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Avancement', async () => {
    const deleteButton = avancementComponentsPage.getDeleteButton(avancementComponentsPage.records.last());
    await click(deleteButton);

    avancementDeleteDialog = new AvancementDeleteDialog();
    await waitUntilDisplayed(avancementDeleteDialog.deleteModal);
    expect(await avancementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.avancement.delete.question/);
    await avancementDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(avancementDeleteDialog.deleteModal);

    expect(await isVisible(avancementDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([avancementComponentsPage.noRecords, avancementComponentsPage.table]);

    const afterCount = (await isVisible(avancementComponentsPage.noRecords)) ? 0 : await getRecordsCount(avancementComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
