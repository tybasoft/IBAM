import { element, by, ElementFinder } from 'protractor';

export default class NotificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.notification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#notification-libelle'));
  descriptionInput: ElementFinder = element(by.css('input#notification-description'));
  dateInput: ElementFinder = element(by.css('input#notification-date'));
  sourceInput: ElementFinder = element(by.css('input#notification-source'));
  visualiseInput: ElementFinder = element(by.css('input#notification-visualise'));
  userSelect: ElementFinder = element(by.css('select#notification-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setSourceInput(source) {
    await this.sourceInput.sendKeys(source);
  }

  async getSourceInput() {
    return this.sourceInput.getAttribute('value');
  }

  getVisualiseInput() {
    return this.visualiseInput;
  }
  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
