import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PointageUpdatePage from './pointage-update.page-object';

const expect = chai.expect;
export class PointageDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.pointage.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-pointage'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PointageComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('pointage-heading'));
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
    await navBarPage.getEntityPage('pointage');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePointage() {
    await this.createButton.click();
    return new PointageUpdatePage();
  }

  async deletePointage() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const pointageDeleteDialog = new PointageDeleteDialog();
    await waitUntilDisplayed(pointageDeleteDialog.deleteModal);
    expect(await pointageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.pointage.delete.question/);
    await pointageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(pointageDeleteDialog.deleteModal);

    expect(await isVisible(pointageDeleteDialog.deleteModal)).to.be.false;
  }
}
