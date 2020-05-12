import { element, by, ElementFinder } from 'protractor';

export default class HoraireUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.horaire.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#horaire-libelle'));
  nbrHeurParJrInput: ElementFinder = element(by.css('input#horaire-nbrHeurParJr'));
  nbrJourParSemInput: ElementFinder = element(by.css('input#horaire-nbrJourParSem'));
  heureDebutJrInput: ElementFinder = element(by.css('input#horaire-heureDebutJr'));
  heureFinJrInput: ElementFinder = element(by.css('input#horaire-heureFinJr'));
  dureePauseInput: ElementFinder = element(by.css('input#horaire-dureePause'));
  userModifInput: ElementFinder = element(by.css('input#horaire-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#horaire-dateModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setNbrHeurParJrInput(nbrHeurParJr) {
    await this.nbrHeurParJrInput.sendKeys(nbrHeurParJr);
  }

  async getNbrHeurParJrInput() {
    return this.nbrHeurParJrInput.getAttribute('value');
  }

  async setNbrJourParSemInput(nbrJourParSem) {
    await this.nbrJourParSemInput.sendKeys(nbrJourParSem);
  }

  async getNbrJourParSemInput() {
    return this.nbrJourParSemInput.getAttribute('value');
  }

  async setHeureDebutJrInput(heureDebutJr) {
    await this.heureDebutJrInput.sendKeys(heureDebutJr);
  }

  async getHeureDebutJrInput() {
    return this.heureDebutJrInput.getAttribute('value');
  }

  async setHeureFinJrInput(heureFinJr) {
    await this.heureFinJrInput.sendKeys(heureFinJr);
  }

  async getHeureFinJrInput() {
    return this.heureFinJrInput.getAttribute('value');
  }

  async setDureePauseInput(dureePause) {
    await this.dureePauseInput.sendKeys(dureePause);
  }

  async getDureePauseInput() {
    return this.dureePauseInput.getAttribute('value');
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
