import { element, by, ElementFinder } from 'protractor';

export default class ProjetUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.projet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceInput: ElementFinder = element(by.css('input#projet-reference'));
  libelleInput: ElementFinder = element(by.css('input#projet-libelle'));
  descriptionInput: ElementFinder = element(by.css('input#projet-description'));
  dateDebutInput: ElementFinder = element(by.css('input#projet-dateDebut'));
  dateFinInput: ElementFinder = element(by.css('input#projet-dateFin'));
  nbrEmployeInput: ElementFinder = element(by.css('input#projet-nbrEmploye'));
  budgetInput: ElementFinder = element(by.css('input#projet-budget'));
  adresseInput: ElementFinder = element(by.css('input#projet-adresse'));
  villeInput: ElementFinder = element(by.css('input#projet-ville'));
  paysInput: ElementFinder = element(by.css('input#projet-pays'));
  userModifInput: ElementFinder = element(by.css('input#projet-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#projet-dateModif'));
  entrepriseSelect: ElementFinder = element(by.css('select#projet-entreprise'));
  horaireSelect: ElementFinder = element(by.css('select#projet-horaire'));
  depotSelect: ElementFinder = element(by.css('select#projet-depot'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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

  async setNbrEmployeInput(nbrEmploye) {
    await this.nbrEmployeInput.sendKeys(nbrEmploye);
  }

  async getNbrEmployeInput() {
    return this.nbrEmployeInput.getAttribute('value');
  }

  async setBudgetInput(budget) {
    await this.budgetInput.sendKeys(budget);
  }

  async getBudgetInput() {
    return this.budgetInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
  }

  async setVilleInput(ville) {
    await this.villeInput.sendKeys(ville);
  }

  async getVilleInput() {
    return this.villeInput.getAttribute('value');
  }

  async setPaysInput(pays) {
    await this.paysInput.sendKeys(pays);
  }

  async getPaysInput() {
    return this.paysInput.getAttribute('value');
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

  async entrepriseSelectLastOption() {
    await this.entrepriseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async entrepriseSelectOption(option) {
    await this.entrepriseSelect.sendKeys(option);
  }

  getEntrepriseSelect() {
    return this.entrepriseSelect;
  }

  async getEntrepriseSelectedOption() {
    return this.entrepriseSelect.element(by.css('option:checked')).getText();
  }

  async horaireSelectLastOption() {
    await this.horaireSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async horaireSelectOption(option) {
    await this.horaireSelect.sendKeys(option);
  }

  getHoraireSelect() {
    return this.horaireSelect;
  }

  async getHoraireSelectedOption() {
    return this.horaireSelect.element(by.css('option:checked')).getText();
  }

  async depotSelectLastOption() {
    await this.depotSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async depotSelectOption(option) {
    await this.depotSelect.sendKeys(option);
  }

  getDepotSelect() {
    return this.depotSelect;
  }

  async getDepotSelectedOption() {
    return this.depotSelect.element(by.css('option:checked')).getText();
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
