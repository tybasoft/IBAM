import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BonCommandeUpdatePage from './bon-commande-update.page-object';

const expect = chai.expect;
export class BonCommandeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.bonCommande.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bonCommande'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BonCommandeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bon-commande-heading'));
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
    await navBarPage.getEntityPage('bon-commande');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBonCommande() {
    await this.createButton.click();
    return new BonCommandeUpdatePage();
  }

  async deleteBonCommande() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bonCommandeDeleteDialog = new BonCommandeDeleteDialog();
    await waitUntilDisplayed(bonCommandeDeleteDialog.deleteModal);
    expect(await bonCommandeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.bonCommande.delete.question/);
    await bonCommandeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bonCommandeDeleteDialog.deleteModal);

    expect(await isVisible(bonCommandeDeleteDialog.deleteModal)).to.be.false;
  }
}
