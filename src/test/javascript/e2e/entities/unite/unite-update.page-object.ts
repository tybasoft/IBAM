import { element, by, ElementFinder } from 'protractor';

export default class UniteUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.unite.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#unite-libelle'));
  symboleInput: ElementFinder = element(by.css('input#unite-symbole'));
  descriptionInput: ElementFinder = element(by.css('input#unite-description'));
  userModifInput: ElementFinder = element(by.css('input#unite-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#unite-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setSymboleInput(symbole) {
    await this.symboleInput.sendKeys(symbole);
  }

  async getSymboleInput() {
    return this.symboleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
