import { element, by, ElementFinder } from 'protractor';

export default class MaintenanceUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.maintenance.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceInput: ElementFinder = element(by.css('input#maintenance-reference'));
  datePanneInput: ElementFinder = element(by.css('input#maintenance-datePanne'));
  fraisInput: ElementFinder = element(by.css('input#maintenance-frais'));
  technicienInput: ElementFinder = element(by.css('input#maintenance-technicien'));
  motifInput: ElementFinder = element(by.css('input#maintenance-motif'));
  problemeFrequentInput: ElementFinder = element(by.css('input#maintenance-problemeFrequent'));
  remarqueInput: ElementFinder = element(by.css('input#maintenance-remarque'));
  dureePanneInput: ElementFinder = element(by.css('input#maintenance-dureePanne'));
  userModifInput: ElementFinder = element(by.css('input#maintenance-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#maintenance-dateModif'));
  materielSelect: ElementFinder = element(by.css('select#maintenance-materiel'));
  centreMaintenanceSelect: ElementFinder = element(by.css('select#maintenance-centreMaintenance'));
  imageSelect: ElementFinder = element(by.css('select#maintenance-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setDatePanneInput(datePanne) {
    await this.datePanneInput.sendKeys(datePanne);
  }

  async getDatePanneInput() {
    return this.datePanneInput.getAttribute('value');
  }

  async setFraisInput(frais) {
    await this.fraisInput.sendKeys(frais);
  }

  async getFraisInput() {
    return this.fraisInput.getAttribute('value');
  }

  async setTechnicienInput(technicien) {
    await this.technicienInput.sendKeys(technicien);
  }

  async getTechnicienInput() {
    return this.technicienInput.getAttribute('value');
  }

  async setMotifInput(motif) {
    await this.motifInput.sendKeys(motif);
  }

  async getMotifInput() {
    return this.motifInput.getAttribute('value');
  }

  getProblemeFrequentInput() {
    return this.problemeFrequentInput;
  }
  async setRemarqueInput(remarque) {
    await this.remarqueInput.sendKeys(remarque);
  }

  async getRemarqueInput() {
    return this.remarqueInput.getAttribute('value');
  }

  async setDureePanneInput(dureePanne) {
    await this.dureePanneInput.sendKeys(dureePanne);
  }

  async getDureePanneInput() {
    return this.dureePanneInput.getAttribute('value');
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

  async centreMaintenanceSelectLastOption() {
    await this.centreMaintenanceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async centreMaintenanceSelectOption(option) {
    await this.centreMaintenanceSelect.sendKeys(option);
  }

  getCentreMaintenanceSelect() {
    return this.centreMaintenanceSelect;
  }

  async getCentreMaintenanceSelectedOption() {
    return this.centreMaintenanceSelect.element(by.css('option:checked')).getText();
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
