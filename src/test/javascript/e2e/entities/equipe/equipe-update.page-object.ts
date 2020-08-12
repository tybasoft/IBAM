import { element, by, ElementFinder } from 'protractor';

export default class EquipeUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.equipe.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#equipe-libelle'));
  userModifInput: ElementFinder = element(by.css('input#equipe-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#equipe-dateModif'));
  projetSelect: ElementFinder = element(by.css('select#equipe-projet'));
  equipeSelect: ElementFinder = element(by.css('select#equipe-equipe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
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

  async projetSelectLastOption() {
    await this.projetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projetSelectOption(option) {
    await this.projetSelect.sendKeys(option);
  }

  getProjetSelect() {
    return this.projetSelect;
  }

  async getProjetSelectedOption() {
    return this.projetSelect.element(by.css('option:checked')).getText();
  }

  async equipeSelectLastOption() {
    await this.equipeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async equipeSelectOption(option) {
    await this.equipeSelect.sendKeys(option);
  }

  getEquipeSelect() {
    return this.equipeSelect;
  }

  async getEquipeSelectedOption() {
    return this.equipeSelect.element(by.css('option:checked')).getText();
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
