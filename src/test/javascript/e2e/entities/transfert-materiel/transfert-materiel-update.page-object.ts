import { element, by, ElementFinder } from 'protractor';

export default class TransfertMaterielUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.transfertMateriel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceInput: ElementFinder = element(by.css('input#transfert-materiel-reference'));
  dateTransfertInput: ElementFinder = element(by.css('input#transfert-materiel-dateTransfert'));
  commentaireInput: ElementFinder = element(by.css('input#transfert-materiel-commentaire'));
  userModifInput: ElementFinder = element(by.css('input#transfert-materiel-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#transfert-materiel-dateModif'));
  materielSelect: ElementFinder = element(by.css('select#transfert-materiel-materiel'));
  projetSelect: ElementFinder = element(by.css('select#transfert-materiel-projet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setDateTransfertInput(dateTransfert) {
    await this.dateTransfertInput.sendKeys(dateTransfert);
  }

  async getDateTransfertInput() {
    return this.dateTransfertInput.getAttribute('value');
  }

  async setCommentaireInput(commentaire) {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput() {
    return this.commentaireInput.getAttribute('value');
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
