import { element, by, ElementFinder } from 'protractor';

export default class PointageUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.pointage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateJourInput: ElementFinder = element(by.css('input#pointage-dateJour'));
  presenceMatinInput: ElementFinder = element(by.css('input#pointage-presenceMatin'));
  presenceAPMInput: ElementFinder = element(by.css('input#pointage-presenceAPM'));
  nbrHeureSupInput: ElementFinder = element(by.css('input#pointage-nbrHeureSup'));
  remarquesInput: ElementFinder = element(by.css('input#pointage-remarques'));
  userModifInput: ElementFinder = element(by.css('input#pointage-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#pointage-dateModif'));
  employeSelect: ElementFinder = element(by.css('select#pointage-employe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateJourInput(dateJour) {
    await this.dateJourInput.sendKeys(dateJour);
  }

  async getDateJourInput() {
    return this.dateJourInput.getAttribute('value');
  }

  getPresenceMatinInput() {
    return this.presenceMatinInput;
  }
  getPresenceAPMInput() {
    return this.presenceAPMInput;
  }
  async setNbrHeureSupInput(nbrHeureSup) {
    await this.nbrHeureSupInput.sendKeys(nbrHeureSup);
  }

  async getNbrHeureSupInput() {
    return this.nbrHeureSupInput.getAttribute('value');
  }

  async setRemarquesInput(remarques) {
    await this.remarquesInput.sendKeys(remarques);
  }

  async getRemarquesInput() {
    return this.remarquesInput.getAttribute('value');
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

  async employeSelectLastOption() {
    await this.employeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeSelectOption(option) {
    await this.employeSelect.sendKeys(option);
  }

  getEmployeSelect() {
    return this.employeSelect;
  }

  async getEmployeSelectedOption() {
    return this.employeSelect.element(by.css('option:checked')).getText();
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
