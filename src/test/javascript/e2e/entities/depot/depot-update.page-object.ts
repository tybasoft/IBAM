import { element, by, ElementFinder } from 'protractor';

export default class DepotUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.depot.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#depot-libelle'));
  adresseInput: ElementFinder = element(by.css('input#depot-adresse'));
  telInput: ElementFinder = element(by.css('input#depot-tel'));
  villeInput: ElementFinder = element(by.css('input#depot-ville'));
  paysInput: ElementFinder = element(by.css('input#depot-pays'));
  userModifInput: ElementFinder = element(by.css('input#depot-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#depot-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
  }

  async setTelInput(tel) {
    await this.telInput.sendKeys(tel);
  }

  async getTelInput() {
    return this.telInput.getAttribute('value');
  }

  async setVilleInput(ville) {
    await this.villeInput.sendKeys(ville);
  }

  async getVilleInput() {
    return this.villeInput.getAttribute('value');
  }

  async setPaysInput(pays) {
    await this.paysInput.sendKeys(pays);
  }

  async getPaysInput() {
    return this.paysInput.getAttribute('value');
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
