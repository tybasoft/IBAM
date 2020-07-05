import { element, by, ElementFinder } from 'protractor';

export default class FournisseurUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.fournisseur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomCommercialInput: ElementFinder = element(by.css('input#fournisseur-nomCommercial'));
  typeInput: ElementFinder = element(by.css('input#fournisseur-type'));
  faxInput: ElementFinder = element(by.css('input#fournisseur-fax'));
  nomInput: ElementFinder = element(by.css('input#fournisseur-nom'));
  prenomInput: ElementFinder = element(by.css('input#fournisseur-prenom'));
  emailInput: ElementFinder = element(by.css('input#fournisseur-email'));
  telInput: ElementFinder = element(by.css('input#fournisseur-tel'));
  adresseInput: ElementFinder = element(by.css('input#fournisseur-adresse'));
  descriptionInput: ElementFinder = element(by.css('input#fournisseur-description'));
  userModifInput: ElementFinder = element(by.css('input#fournisseur-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#fournisseur-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomCommercialInput(nomCommercial) {
    await this.nomCommercialInput.sendKeys(nomCommercial);
  }

  async getNomCommercialInput() {
    return this.nomCommercialInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setFaxInput(fax) {
    await this.faxInput.sendKeys(fax);
  }

  async getFaxInput() {
    return this.faxInput.getAttribute('value');
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom) {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput() {
    return this.prenomInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setTelInput(tel) {
    await this.telInput.sendKeys(tel);
  }

  async getTelInput() {
    return this.telInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
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
