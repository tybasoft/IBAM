import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BonReceptionUpdatePage from './bon-reception-update.page-object';

const expect = chai.expect;
export class BonReceptionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.bonReception.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bonReception'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BonReceptionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bon-reception-heading'));
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
    await navBarPage.getEntityPage('bon-reception');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBonReception() {
    await this.createButton.click();
    return new BonReceptionUpdatePage();
  }

  async deleteBonReception() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bonReceptionDeleteDialog = new BonReceptionDeleteDialog();
    await waitUntilDisplayed(bonReceptionDeleteDialog.deleteModal);
    expect(await bonReceptionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.bonReception.delete.question/);
    await bonReceptionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bonReceptionDeleteDialog.deleteModal);

    expect(await isVisible(bonReceptionDeleteDialog.deleteModal)).to.be.false;
  }
}
