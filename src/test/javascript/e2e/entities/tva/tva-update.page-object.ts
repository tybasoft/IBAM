import { element, by, ElementFinder } from 'protractor';

export default class TvaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.tva.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tauxInput: ElementFinder = element(by.css('input#tva-taux'));
  userModifInput: ElementFinder = element(by.css('input#tva-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#tva-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTauxInput(taux) {
    await this.tauxInput.sendKeys(taux);
  }

  async getTauxInput() {
    return this.tauxInput.getAttribute('value');
  }

  async setUserModifInput(userModif) {
    await this.userModifInput.sendKeys(userModif);
  }

  async getUserModifInput() {
    return this.userModifInput.getAttribute('value');
  }

  async setDateModifInput(dateModif) {
    await this.dateModifInput.sendKeys(dateModif);
  }

  async getDateModifInput() {
    return this.dateModifInput.getAttribute('value');
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
