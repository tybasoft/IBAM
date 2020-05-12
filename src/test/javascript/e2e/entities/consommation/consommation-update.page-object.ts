import { element, by, ElementFinder } from 'protractor';

export default class ConsommationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.consommation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  referenceInput: ElementFinder = element(by.css('input#consommation-reference'));
  dateAchatInput: ElementFinder = element(by.css('input#consommation-dateAchat'));
  typeCarburantInput: ElementFinder = element(by.css('input#consommation-typeCarburant'));
  montantInput: ElementFinder = element(by.css('input#consommation-montant'));
  quantiteInput: ElementFinder = element(by.css('input#consommation-quantite'));
  kilometrageInput: ElementFinder = element(by.css('input#consommation-kilometrage'));
  commentaireInput: ElementFinder = element(by.css('input#consommation-commentaire'));
  userModifInput: ElementFinder = element(by.css('input#consommation-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#consommation-dateModif'));
  materielSelect: ElementFinder = element(by.css('select#consommation-materiel'));
  fournisseurSelect: ElementFinder = element(by.css('select#consommation-fournisseur'));
  imageSelect: ElementFinder = element(by.css('select#consommation-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setDateAchatInput(dateAchat) {
    await this.dateAchatInput.sendKeys(dateAchat);
  }

  async getDateAchatInput() {
    return this.dateAchatInput.getAttribute('value');
  }

  async setTypeCarburantInput(typeCarburant) {
    await this.typeCarburantInput.sendKeys(typeCarburant);
  }

  async getTypeCarburantInput() {
    return this.typeCarburantInput.getAttribute('value');
  }

  async setMontantInput(montant) {
    await this.montantInput.sendKeys(montant);
  }

  async getMontantInput() {
    return this.montantInput.getAttribute('value');
  }

  async setQuantiteInput(quantite) {
    await this.quantiteInput.sendKeys(quantite);
  }

  async getQuantiteInput() {
    return this.quantiteInput.getAttribute('value');
  }

  async setKilometrageInput(kilometrage) {
    await this.kilometrageInput.sendKeys(kilometrage);
  }

  async getKilometrageInput() {
    return this.kilometrageInput.getAttribute('value');
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
