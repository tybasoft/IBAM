import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SituationFinanciereUpdatePage from './situation-financiere-update.page-object';

const expect = chai.expect;
export class SituationFinanciereDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.situationFinanciere.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-situationFinanciere'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SituationFinanciereComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('situation-financiere-heading'));
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
    await navBarPage.getEntityPage('situation-financiere');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSituationFinanciere() {
    await this.createButton.click();
    return new SituationFinanciereUpdatePage();
  }

  async deleteSituationFinanciere() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const situationFinanciereDeleteDialog = new SituationFinanciereDeleteDialog();
    await waitUntilDisplayed(situationFinanciereDeleteDialog.deleteModal);
    expect(await situationFinanciereDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ibamApp.situationFinanciere.delete.question/
    );
    await situationFinanciereDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(situationFinanciereDeleteDialog.deleteModal);

    expect(await isVisible(situationFinanciereDeleteDialog.deleteModal)).to.be.false;
  }
}
