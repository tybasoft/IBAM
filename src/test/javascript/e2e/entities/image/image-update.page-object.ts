import { element, by, ElementFinder } from 'protractor';

export default class ImageUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.image.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titreInput: ElementFinder = element(by.css('input#image-titre'));
  pathInput: ElementFinder = element(by.css('input#image-path'));
  userModifInput: ElementFinder = element(by.css('input#image-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#image-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitreInput(titre) {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput() {
    return this.titreInput.getAttribute('value');
  }

  async setPathInput(path) {
    await this.pathInput.sendKeys(path);
  }

  async getPathInput() {
    return this.pathInput.getAttribute('value');
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
