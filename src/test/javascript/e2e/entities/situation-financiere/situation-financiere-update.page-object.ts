import { element, by, ElementFinder } from 'protractor';

export default class SituationFinanciereUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.situationFinanciere.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  montantFactureInput: ElementFinder = element(by.css('input#situation-financiere-montantFacture'));
  dateFacturationInput: ElementFinder = element(by.css('input#situation-financiere-dateFacturation'));
  montantEnCoursInput: ElementFinder = element(by.css('input#situation-financiere-montantEnCours'));
  projetSelect: ElementFinder = element(by.css('select#situation-financiere-projet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMontantFactureInput(montantFacture) {
    await this.montantFactureInput.sendKeys(montantFacture);
  }

  async getMontantFactureInput() {
    return this.montantFactureInput.getAttribute('value');
  }

  async setDateFacturationInput(dateFacturation) {
    await this.dateFacturationInput.sendKeys(dateFacturation);
  }

  async getDateFacturationInput() {
    return this.dateFacturationInput.getAttribute('value');
  }

  async setMontantEnCoursInput(montantEnCours) {
    await this.montantEnCoursInput.sendKeys(montantEnCours);
  }

  async getMontantEnCoursInput() {
    return this.montantEnCoursInput.getAttribute('value');
  }

  async projetSelectLastOption() {
    await this.projetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projetSelectOption(option) {
    await this.projetSelect.sendKeys(option);
  }

  getProjetSelect() {
    return this.projetSelect;
  }

  async getProjetSelectedOption() {
    return this.projetSelect.element(by.css('option:checked')).getText();
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
