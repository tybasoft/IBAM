import { element, by, ElementFinder } from 'protractor';

export default class AssuranceUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.assurance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateDebutInput: ElementFinder = element(by.css('input#assurance-dateDebut'));
  dateFinInput: ElementFinder = element(by.css('input#assurance-dateFin'));
  agenceInput: ElementFinder = element(by.css('input#assurance-agence'));
  userModifInput: ElementFinder = element(by.css('input#assurance-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#assurance-dateModif'));
  materielSelect: ElementFinder = element(by.css('select#assurance-materiel'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateDebutInput(dateDebut) {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput() {
    return this.dateDebutInput.getAttribute('value');
  }

  async setDateFinInput(dateFin) {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput() {
    return this.dateFinInput.getAttribute('value');
  }

  async setAgenceInput(agence) {
    await this.agenceInput.sendKeys(agence);
  }

  async getAgenceInput() {
    return this.agenceInput.getAttribute('value');
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

  async materielSelectLastOption() {
    await this.materielSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async materielSelectOption(option) {
    await this.materielSelect.sendKeys(option);
  }

  getMaterielSelect() {
    return this.materielSelect;
  }

  async getMaterielSelectedOption() {
    return this.materielSelect.element(by.css('option:checked')).getText();
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
