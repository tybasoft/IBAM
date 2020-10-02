import { element, by, ElementFinder } from 'protractor';

export default class LocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.location.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceInput: ElementFinder = element(by.css('input#location-reference'));
  dateDebutInput: ElementFinder = element(by.css('input#location-dateDebut'));
  dateFinInput: ElementFinder = element(by.css('input#location-dateFin'));
  tarifInput: ElementFinder = element(by.css('input#location-tarif'));
  dureLocationInput: ElementFinder = element(by.css('input#location-dureLocation'));
  montantLocationInput: ElementFinder = element(by.css('input#location-montantLocation'));
  remarqueInput: ElementFinder = element(by.css('input#location-remarque'));
  userModifInput: ElementFinder = element(by.css('input#location-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#location-dateModif'));
  materielSelect: ElementFinder = element(by.css('select#location-materiel'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
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

  async setTarifInput(tarif) {
    await this.tarifInput.sendKeys(tarif);
  }

  async getTarifInput() {
    return this.tarifInput.getAttribute('value');
  }

  async setDureLocationInput(dureLocation) {
    await this.dureLocationInput.sendKeys(dureLocation);
  }

  async getDureLocationInput() {
    return this.dureLocationInput.getAttribute('value');
  }

  async setMontantLocationInput(montantLocation) {
    await this.montantLocationInput.sendKeys(montantLocation);
  }

  async getMontantLocationInput() {
    return this.montantLocationInput.getAttribute('value');
  }

  async setRemarqueInput(remarque) {
    await this.remarqueInput.sendKeys(remarque);
  }

  async getRemarqueInput() {
    return this.remarqueInput.getAttribute('value');
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
