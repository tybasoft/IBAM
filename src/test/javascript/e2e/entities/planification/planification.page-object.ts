import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PlanificationUpdatePage from './planification-update.page-object';

const expect = chai.expect;
export class PlanificationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('ibamApp.planification.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-planification'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PlanificationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('planification-heading'));
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
    await navBarPage.getEntityPage('planification');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePlanification() {
    await this.createButton.click();
    return new PlanificationUpdatePage();
  }

  async deletePlanification() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const planificationDeleteDialog = new PlanificationDeleteDialog();
    await waitUntilDisplayed(planificationDeleteDialog.deleteModal);
    expect(await planificationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ibamApp.planification.delete.question/);
    await planificationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(planificationDeleteDialog.deleteModal);

    expect(await isVisible(planificationDeleteDialog.deleteModal)).to.be.false;
  }
}
