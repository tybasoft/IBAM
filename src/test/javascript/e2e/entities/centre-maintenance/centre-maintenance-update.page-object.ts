import { element, by, ElementFinder } from 'protractor';

export default class CentreMaintenanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.centreMaintenance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#centre-maintenance-libelle'));
  specialiteInput: ElementFinder = element(by.css('input#centre-maintenance-specialite'));
  responsableInput: ElementFinder = element(by.css('input#centre-maintenance-responsable'));
  adresseInput: ElementFinder = element(by.css('input#centre-maintenance-adresse'));
  telephoneInput: ElementFinder = element(by.css('input#centre-maintenance-telephone'));
  emailInput: ElementFinder = element(by.css('input#centre-maintenance-email'));
  userModifInput: ElementFinder = element(by.css('input#centre-maintenance-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#centre-maintenance-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setSpecialiteInput(specialite) {
    await this.specialiteInput.sendKeys(specialite);
  }

  async getSpecialiteInput() {
    return this.specialiteInput.getAttribute('value');
  }

  async setResponsableInput(responsable) {
    await this.responsableInput.sendKeys(responsable);
  }

  async getResponsableInput() {
    return this.responsableInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
  }

  async setTelephoneInput(telephone) {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput() {
    return this.telephoneInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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
