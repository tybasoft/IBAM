import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AvancementUpdatePage from './avancement-update.page-object';

const expect = chai.expect;
export class AvancementDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.avancement.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-avancement'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AvancementComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('avancement-heading'));
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
    await navBarPage.getEntityPage('avancement');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAvancement() {
    await this.createButton.click();
    return new AvancementUpdatePage();
  }

  async deleteAvancement() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const avancementDeleteDialog = new AvancementDeleteDialog();
    await waitUntilDisplayed(avancementDeleteDialog.deleteModal);
    expect(await avancementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.avancement.delete.question/);
    await avancementDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(avancementDeleteDialog.deleteModal);

    expect(await isVisible(avancementDeleteDialog.deleteModal)).to.be.false;
  }
}
