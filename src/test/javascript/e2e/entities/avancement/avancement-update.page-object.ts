import { element, by, ElementFinder } from 'protractor';

export default class AvancementUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.avancement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  createdAtInput: ElementFinder = element(by.css('input#avancement-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#avancement-updatedAt'));
  compteRenduSelect: ElementFinder = element(by.css('select#avancement-compteRendu'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt) {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput() {
    return this.updatedAtInput.getAttribute('value');
  }

  async compteRenduSelectLastOption() {
    await this.compteRenduSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async compteRenduSelectOption(option) {
    await this.compteRenduSelect.sendKeys(option);
  }

  getCompteRenduSelect() {
    return this.compteRenduSelect;
  }

  async getCompteRenduSelectedOption() {
    return this.compteRenduSelect.element(by.css('option:checked')).getText();
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
