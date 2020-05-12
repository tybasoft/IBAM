import { element, by, ElementFinder } from 'protractor';

export default class EntrepriseUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.entreprise.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  entiteJuridiqueInput: ElementFinder = element(by.css('input#entreprise-entiteJuridique'));
  nomCommercialInput: ElementFinder = element(by.css('input#entreprise-nomCommercial'));
  adresseInput: ElementFinder = element(by.css('input#entreprise-adresse'));
  capitalInput: ElementFinder = element(by.css('input#entreprise-capital'));
  directionInput: ElementFinder = element(by.css('input#entreprise-direction'));
  activiteInput: ElementFinder = element(by.css('input#entreprise-activite'));
  telephoneInput: ElementFinder = element(by.css('input#entreprise-telephone'));
  emailInput: ElementFinder = element(by.css('input#entreprise-email'));
  userModifInput: ElementFinder = element(by.css('input#entreprise-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#entreprise-dateModif'));
  imageSelect: ElementFinder = element(by.css('select#entreprise-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEntiteJuridiqueInput(entiteJuridique) {
    await this.entiteJuridiqueInput.sendKeys(entiteJuridique);
  }

  async getEntiteJuridiqueInput() {
    return this.entiteJuridiqueInput.getAttribute('value');
  }

  async setNomCommercialInput(nomCommercial) {
    await this.nomCommercialInput.sendKeys(nomCommercial);
  }

  async getNomCommercialInput() {
    return this.nomCommercialInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
  }

  async setCapitalInput(capital) {
    await this.capitalInput.sendKeys(capital);
  }

  async getCapitalInput() {
    return this.capitalInput.getAttribute('value');
  }

  async setDirectionInput(direction) {
    await this.directionInput.sendKeys(direction);
  }

  async getDirectionInput() {
    return this.directionInput.getAttribute('value');
  }

  async setActiviteInput(activite) {
    await this.activiteInput.sendKeys(activite);
  }

  async getActiviteInput() {
    return this.activiteInput.getAttribute('value');
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

  async imageSelectLastOption() {
    await this.imageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async imageSelectOption(option) {
    await this.imageSelect.sendKeys(option);
  }

  getImageSelect() {
    return this.imageSelect;
  }

  async getImageSelectedOption() {
    return this.imageSelect.element(by.css('option:checked')).getText();
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
