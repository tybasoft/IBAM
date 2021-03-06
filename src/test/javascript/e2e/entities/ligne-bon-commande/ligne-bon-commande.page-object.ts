import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';
import chai from 'chai';

import NavBarPage from './../../page-objects/navbar-page';

import LigneBonCommandeUpdatePage from './ligne-bon-commande-update.page-object';

const expect = chai.expect;
export class LigneBonCommandeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.ligneBonCommande.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-ligneBonCommande'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LigneBonCommandeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('ligne-bon-commande-heading'));
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
    await navBarPage.getEntityPage('ligne-bon-commande');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLigneBonCommande() {
    await this.createButton.click();
    return new LigneBonCommandeUpdatePage();
  }

  async deleteLigneBonCommande() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const ligneBonCommandeDeleteDialog = new LigneBonCommandeDeleteDialog();
    await waitUntilDisplayed(ligneBonCommandeDeleteDialog.deleteModal);
    expect(await ligneBonCommandeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.ligneBonCommande.delete.question/);
    await ligneBonCommandeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ligneBonCommandeDeleteDialog.deleteModal);

    expect(await isVisible(ligneBonCommandeDeleteDialog.deleteModal)).to.be.false;
  }
}
