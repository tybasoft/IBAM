import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FichePointageUpdatePage from './fiche-pointage-update.page-object';

const expect = chai.expect;
export class FichePointageDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.fichePointage.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fichePointage'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FichePointageComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('fiche-pointage-heading'));
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
    await navBarPage.getEntityPage('fiche-pointage');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFichePointage() {
    await this.createButton.click();
    return new FichePointageUpdatePage();
  }

  async deleteFichePointage() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fichePointageDeleteDialog = new FichePointageDeleteDialog();
    await waitUntilDisplayed(fichePointageDeleteDialog.deleteModal);
    expect(await fichePointageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.fichePointage.delete.question/);
    await fichePointageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fichePointageDeleteDialog.deleteModal);

    expect(await isVisible(fichePointageDeleteDialog.deleteModal)).to.be.false;
  }
}
