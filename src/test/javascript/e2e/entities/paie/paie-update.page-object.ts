import { element, by, ElementFinder } from 'protractor';

export default class PaieUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.paie.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  datePaiementInput: ElementFinder = element(by.css('input#paie-datePaiement'));
  nbrJourTravailInput: ElementFinder = element(by.css('input#paie-nbrJourTravail'));
  montantPayInput: ElementFinder = element(by.css('input#paie-montantPay'));
  nbrHeurSupInput: ElementFinder = element(by.css('input#paie-nbrHeurSup'));
  dateDebutInput: ElementFinder = element(by.css('input#paie-dateDebut'));
  dateFinInput: ElementFinder = element(by.css('input#paie-dateFin'));
  remarquesInput: ElementFinder = element(by.css('input#paie-remarques'));
  userModifInput: ElementFinder = element(by.css('input#paie-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#paie-dateModif'));
  employeSelect: ElementFinder = element(by.css('select#paie-employe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDatePaiementInput(datePaiement) {
    await this.datePaiementInput.sendKeys(datePaiement);
  }

  async getDatePaiementInput() {
    return this.datePaiementInput.getAttribute('value');
  }

  async setNbrJourTravailInput(nbrJourTravail) {
    await this.nbrJourTravailInput.sendKeys(nbrJourTravail);
  }

  async getNbrJourTravailInput() {
    return this.nbrJourTravailInput.getAttribute('value');
  }

  async setMontantPayInput(montantPay) {
    await this.montantPayInput.sendKeys(montantPay);
  }

  async getMontantPayInput() {
    return this.montantPayInput.getAttribute('value');
  }

  async setNbrHeurSupInput(nbrHeurSup) {
    await this.nbrHeurSupInput.sendKeys(nbrHeurSup);
  }

  async getNbrHeurSupInput() {
    return this.nbrHeurSupInput.getAttribute('value');
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
