import { element, by, ElementFinder } from 'protractor';

export default class BonCommandeUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.bonCommande.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  datePrevLivInput: ElementFinder = element(by.css('input#bon-commande-datePrevLiv'));
  remarquesInput: ElementFinder = element(by.css('input#bon-commande-remarques'));
  dateCreationInput: ElementFinder = element(by.css('input#bon-commande-dateCreation'));
  valideInput: ElementFinder = element(by.css('input#bon-commande-valide'));
  userModifInput: ElementFinder = element(by.css('input#bon-commande-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#bon-commande-dateModif'));
  depotSelect: ElementFinder = element(by.css('select#bon-commande-depot'));
  fournisseurSelect: ElementFinder = element(by.css('select#bon-commande-fournisseur'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDatePrevLivInput(datePrevLiv) {
    await this.datePrevLivInput.sendKeys(datePrevLiv);
  }

  async getDatePrevLivInput() {
    return this.datePrevLivInput.getAttribute('value');
  }

  async setRemarquesInput(remarques) {
    await this.remarquesInput.sendKeys(remarques);
  }

  async getRemarquesInput() {
    return this.remarquesInput.getAttribute('value');
  }

  async setDateCreationInput(dateCreation) {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput() {
    return this.dateCreationInput.getAttribute('value');
  }

  getValideInput() {
    return this.valideInput;
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

  async fournisseurSelectLastOption() {
    await this.fournisseurSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fournisseurSelectOption(option) {
    await this.fournisseurSelect.sendKeys(option);
  }

  getFournisseurSelect() {
    return this.fournisseurSelect;
  }

  async getFournisseurSelectedOption() {
    return this.fournisseurSelect.element(by.css('option:checked')).getText();
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
