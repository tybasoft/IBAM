import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ThemeUpdatePage from './theme-update.page-object';

const expect = chai.expect;
export class ThemeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.theme.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-theme'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ThemeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('theme-heading'));
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
    await navBarPage.getEntityPage('theme');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTheme() {
    await this.createButton.click();
    return new ThemeUpdatePage();
  }

  async deleteTheme() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const themeDeleteDialog = new ThemeDeleteDialog();
    await waitUntilDisplayed(themeDeleteDialog.deleteModal);
    expect(await themeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.theme.delete.question/);
    await themeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(themeDeleteDialog.deleteModal);

    expect(await isVisible(themeDeleteDialog.deleteModal)).to.be.false;
  }
}
