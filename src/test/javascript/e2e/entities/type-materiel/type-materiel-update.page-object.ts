import { element, by, ElementFinder } from 'protractor';

export default class TypeMaterielUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.typeMateriel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeInput: ElementFinder = element(by.css('input#type-materiel-type'));
  userModifInput: ElementFinder = element(by.css('input#type-materiel-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#type-materiel-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
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
