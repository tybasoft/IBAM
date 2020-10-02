import { element, by, ElementFinder } from 'protractor';

export default class VisiteTechniqueUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.visiteTechnique.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceInput: ElementFinder = element(by.css('input#visite-technique-reference'));
  dateVisiteInput: ElementFinder = element(by.css('input#visite-technique-dateVisite'));
  remarqueInput: ElementFinder = element(by.css('input#visite-technique-remarque'));
  userModifInput: ElementFinder = element(by.css('input#visite-technique-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#visite-technique-dateModif'));
  materielSelect: ElementFinder = element(by.css('select#visite-technique-materiel'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setDateVisiteInput(dateVisite) {
    await this.dateVisiteInput.sendKeys(dateVisite);
  }

  async getDateVisiteInput() {
    return this.dateVisiteInput.getAttribute('value');
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
