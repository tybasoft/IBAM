import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MaterielUpdatePage from './materiel-update.page-object';

const expect = chai.expect;
export class MaterielDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.materiel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-materiel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MaterielComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('materiel-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('materiel');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMateriel() {
    await this.createButton.click();
    return new MaterielUpdatePage();
  }

  async deleteMateriel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const materielDeleteDialog = new MaterielDeleteDialog();
    await waitUntilDisplayed(materielDeleteDialog.deleteModal);
    expect(await materielDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.materiel.delete.question/);
    await materielDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(materielDeleteDialog.deleteModal);

    expect(await isVisible(materielDeleteDialog.deleteModal)).to.be.false;
  }
}
