import { element, by, ElementFinder } from 'protractor';

export default class MateriauUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.materiau.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#materiau-libelle'));
  referenceInput: ElementFinder = element(by.css('input#materiau-reference'));
  poidsInput: ElementFinder = element(by.css('input#materiau-poids'));
  volumeInput: ElementFinder = element(by.css('input#materiau-volume'));
  userModifInput: ElementFinder = element(by.css('input#materiau-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#materiau-dateModif'));
  marqueSelect: ElementFinder = element(by.css('select#materiau-marque'));
  uniteSelect: ElementFinder = element(by.css('select#materiau-unite'));
  familleSelect: ElementFinder = element(by.css('select#materiau-famille'));
  tvaSelect: ElementFinder = element(by.css('select#materiau-tva'));
  imageSelect: ElementFinder = element(by.css('select#materiau-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setPoidsInput(poids) {
    await this.poidsInput.sendKeys(poids);
  }

  async getPoidsInput() {
    return this.poidsInput.getAttribute('value');
  }

  async setVolumeInput(volume) {
    await this.volumeInput.sendKeys(volume);
  }

  async getVolumeInput() {
    return this.volumeInput.getAttribute('value');
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

  async marqueSelectLastOption() {
    await this.marqueSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async marqueSelectOption(option) {
    await this.marqueSelect.sendKeys(option);
  }

  getMarqueSelect() {
    return this.marqueSelect;
  }

  async getMarqueSelectedOption() {
    return this.marqueSelect.element(by.css('option:checked')).getText();
  }

  async uniteSelectLastOption() {
    await this.uniteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async uniteSelectOption(option) {
    await this.uniteSelect.sendKeys(option);
  }

  getUniteSelect() {
    return this.uniteSelect;
  }

  async getUniteSelectedOption() {
    return this.uniteSelect.element(by.css('option:checked')).getText();
  }

  async familleSelectLastOption() {
    await this.familleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async familleSelectOption(option) {
    await this.familleSelect.sendKeys(option);
  }

  getFamilleSelect() {
    return this.familleSelect;
  }

  async getFamilleSelectedOption() {
    return this.familleSelect.element(by.css('option:checked')).getText();
  }

  async tvaSelectLastOption() {
    await this.tvaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tvaSelectOption(option) {
    await this.tvaSelect.sendKeys(option);
  }

  getTvaSelect() {
    return this.tvaSelect;
  }

  async getTvaSelectedOption() {
    return this.tvaSelect.element(by.css('option:checked')).getText();
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
