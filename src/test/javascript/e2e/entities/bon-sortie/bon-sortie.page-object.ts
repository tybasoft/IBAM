import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BonSortieUpdatePage from './bon-sortie-update.page-object';

const expect = chai.expect;
export class BonSortieDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.bonSortie.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bonSortie'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BonSortieComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bon-sortie-heading'));
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
    await navBarPage.getEntityPage('bon-sortie');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBonSortie() {
    await this.createButton.click();
    return new BonSortieUpdatePage();
  }

  async deleteBonSortie() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bonSortieDeleteDialog = new BonSortieDeleteDialog();
    await waitUntilDisplayed(bonSortieDeleteDialog.deleteModal);
    expect(await bonSortieDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.bonSortie.delete.question/);
    await bonSortieDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bonSortieDeleteDialog.deleteModal);

    expect(await isVisible(bonSortieDeleteDialog.deleteModal)).to.be.false;
  }
}
