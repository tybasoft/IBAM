import { element, by, ElementFinder } from 'protractor';

export default class CompteRenduUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.compteRendu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titreInput: ElementFinder = element(by.css('input#compte-rendu-titre'));
  contenuInput: ElementFinder = element(by.css('input#compte-rendu-contenu'));
  employeSelect: ElementFinder = element(by.css('select#compte-rendu-employe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitreInput(titre) {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput() {
    return this.titreInput.getAttribute('value');
  }

  async setContenuInput(contenu) {
    await this.contenuInput.sendKeys(contenu);
  }

  async getContenuInput() {
    return this.contenuInput.getAttribute('value');
  }

  async employeSelectLastOption() {
    await this.employeSelect.all(by.tagName('option')).last().click();
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
