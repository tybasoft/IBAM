import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AffectationMaterielsUpdatePage from './affectation-materiels-update.page-object';

const expect = chai.expect;
export class AffectationMaterielsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.affectationMateriels.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-affectationMateriels'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AffectationMaterielsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('affectation-materiels-heading'));
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
    await navBarPage.getEntityPage('affectation-materiels');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAffectationMateriels() {
    await this.createButton.click();
    return new AffectationMaterielsUpdatePage();
  }

  async deleteAffectationMateriels() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const affectationMaterielsDeleteDialog = new AffectationMaterielsDeleteDialog();
    await waitUntilDisplayed(affectationMaterielsDeleteDialog.deleteModal);
    expect(await affectationMaterielsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ibamApp.affectationMateriels.delete.question/
    );
    await affectationMaterielsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(affectationMaterielsDeleteDialog.deleteModal);

    expect(await isVisible(affectationMaterielsDeleteDialog.deleteModal)).to.be.false;
  }
}
