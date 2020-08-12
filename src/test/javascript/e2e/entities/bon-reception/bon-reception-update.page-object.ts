import { element, by, ElementFinder } from 'protractor';

export default class BonReceptionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.bonReception.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  livreurInput: ElementFinder = element(by.css('input#bon-reception-livreur'));
  remarquesInput: ElementFinder = element(by.css('input#bon-reception-remarques'));
  dateLivraisonInput: ElementFinder = element(by.css('input#bon-reception-dateLivraison'));
  userModifInput: ElementFinder = element(by.css('input#bon-reception-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#bon-reception-dateModif'));
  depotSelect: ElementFinder = element(by.css('select#bon-reception-depot'));
  fournisseurSelect: ElementFinder = element(by.css('select#bon-reception-fournisseur'));
  imageSelect: ElementFinder = element(by.css('select#bon-reception-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLivreurInput(livreur) {
    await this.livreurInput.sendKeys(livreur);
  }

  async getLivreurInput() {
    return this.livreurInput.getAttribute('value');
  }

  async setRemarquesInput(remarques) {
    await this.remarquesInput.sendKeys(remarques);
  }

  async getRemarquesInput() {
    return this.remarquesInput.getAttribute('value');
  }

  async setDateLivraisonInput(dateLivraison) {
    await this.dateLivraisonInput.sendKeys(dateLivraison);
  }

  async getDateLivraisonInput() {
    return this.dateLivraisonInput.getAttribute('value');
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
