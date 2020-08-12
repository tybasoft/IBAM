import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TypeMaterielComponentsPage, { TypeMaterielDeleteDialog } from './type-materiel.page-object';
import TypeMaterielUpdatePage from './type-materiel-update.page-object';
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

describe('TypeMateriel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeMaterielComponentsPage: TypeMaterielComponentsPage;
  let typeMaterielUpdatePage: TypeMaterielUpdatePage;
  let typeMaterielDeleteDialog: TypeMaterielDeleteDialog;
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

  it('should load TypeMateriels', async () => {
    await navBarPage.getEntityPage('type-materiel');
    typeMaterielComponentsPage = new TypeMaterielComponentsPage();
    expect(await typeMaterielComponentsPage.title.getText()).to.match(/Type Materiels/);

    expect(await typeMaterielComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([typeMaterielComponentsPage.noRecords, typeMaterielComponentsPage.table]);

    beforeRecordsCount = (await isVisible(typeMaterielComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(typeMaterielComponentsPage.table);
  });

  it('should load create TypeMateriel page', async () => {
    await typeMaterielComponentsPage.createButton.click();
    typeMaterielUpdatePage = new TypeMaterielUpdatePage();
    expect(await typeMaterielUpdatePage.getPageTitle().getAttribute('id')).to.match(/ibamApp.typeMateriel.home.createOrEditLabel/);
    await typeMaterielUpdatePage.cancel();
  });

  it('should create and save TypeMateriels', async () => {
    await typeMaterielComponentsPage.createButton.click();
    await typeMaterielUpdatePage.setTypeInput('type');
    expect(await typeMaterielUpdatePage.getTypeInput()).to.match(/type/);
    await typeMaterielUpdatePage.setUserModifInput('userModif');
    expect(await typeMaterielUpdatePage.getUserModifInput()).to.match(/userModif/);
    await typeMaterielUpdatePage.setDateModifInput('01-01-2001');
    expect(await typeMaterielUpdatePage.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(typeMaterielUpdatePage.saveButton);
    await typeMaterielUpdatePage.save();
    await waitUntilHidden(typeMaterielUpdatePage.saveButton);
    expect(await isVisible(typeMaterielUpdatePage.saveButton)).to.be.false;

    expect(await typeMaterielComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(typeMaterielComponentsPage.table);

    await waitUntilCount(typeMaterielComponentsPage.records, beforeRecordsCount + 1);
    expect(await typeMaterielComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TypeMateriel', async () => {
    const deleteButton = typeMaterielComponentsPage.getDeleteButton(typeMaterielComponentsPage.records.last());
    await click(deleteButton);

    typeMaterielDeleteDialog = new TypeMaterielDeleteDialog();
    await waitUntilDisplayed(typeMaterielDeleteDialog.deleteModal);
    expect(await typeMaterielDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.typeMateriel.delete.question/);
    await typeMaterielDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(typeMaterielDeleteDialog.deleteModal);

    expect(await isVisible(typeMaterielDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([typeMaterielComponentsPage.noRecords, typeMaterielComponentsPage.table]);

    const afterCount = (await isVisible(typeMaterielComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(typeMaterielComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
