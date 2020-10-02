import { element, by, ElementFinder } from 'protractor';

export default class FonctionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.fonction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#fonction-libelle'));
  descriptionInput: ElementFinder = element(by.css('input#fonction-description'));
  competencesInput: ElementFinder = element(by.css('input#fonction-competences'));
  userModifInput: ElementFinder = element(by.css('input#fonction-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#fonction-dateModif'));

  getPageTitle() {
    return this.pageTitle;
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

  async setCompetencesInput(competences) {
    await this.competencesInput.sendKeys(competences);
  }

  async getCompetencesInput() {
    return this.competencesInput.getAttribute('value');
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
