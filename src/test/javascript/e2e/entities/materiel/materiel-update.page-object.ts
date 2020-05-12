import { element, by, ElementFinder } from 'protractor';

export default class MaterielUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.materiel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#materiel-libelle'));
  matriculeInput: ElementFinder = element(by.css('input#materiel-matricule'));
  modeleInput: ElementFinder = element(by.css('input#materiel-modele'));
  numCarteGriseInput: ElementFinder = element(by.css('input#materiel-numCarteGrise'));
  dateIdentificationInput: ElementFinder = element(by.css('input#materiel-dateIdentification'));
  compteurAchatInput: ElementFinder = element(by.css('input#materiel-compteurAchat'));
  etatInput: ElementFinder = element(by.css('input#materiel-etat'));
  locationInput: ElementFinder = element(by.css('input#materiel-location'));
  descriptionInput: ElementFinder = element(by.css('input#materiel-description'));
  userModifInput: ElementFinder = element(by.css('input#materiel-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#materiel-dateModif'));
  familleSelect: ElementFinder = element(by.css('select#materiel-famille'));
  typeMaterielSelect: ElementFinder = element(by.css('select#materiel-typeMateriel'));
  fournisseurSelect: ElementFinder = element(by.css('select#materiel-fournisseur'));
  marqueSelect: ElementFinder = element(by.css('select#materiel-marque'));
  documentSelect: ElementFinder = element(by.css('select#materiel-document'));
  employeSelect: ElementFinder = element(by.css('select#materiel-employe'));
  imageSelect: ElementFinder = element(by.css('select#materiel-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setMatriculeInput(matricule) {
    await this.matriculeInput.sendKeys(matricule);
  }

  async getMatriculeInput() {
    return this.matriculeInput.getAttribute('value');
  }

  async setModeleInput(modele) {
    await this.modeleInput.sendKeys(modele);
  }

  async getModeleInput() {
    return this.modeleInput.getAttribute('value');
  }

  async setNumCarteGriseInput(numCarteGrise) {
    await this.numCarteGriseInput.sendKeys(numCarteGrise);
  }

  async getNumCarteGriseInput() {
    return this.numCarteGriseInput.getAttribute('value');
  }

  async setDateIdentificationInput(dateIdentification) {
    await this.dateIdentificationInput.sendKeys(dateIdentification);
  }

  async getDateIdentificationInput() {
    return this.dateIdentificationInput.getAttribute('value');
  }

  async setCompteurAchatInput(compteurAchat) {
    await this.compteurAchatInput.sendKeys(compteurAchat);
  }

  async getCompteurAchatInput() {
    return this.compteurAchatInput.getAttribute('value');
  }

  async setEtatInput(etat) {
    await this.etatInput.sendKeys(etat);
  }

  async getEtatInput() {
    return this.etatInput.getAttribute('value');
  }

  getLocationInput() {
    return this.locationInput;
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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

  async familleSelectLastOption() {
    await this.familleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async familleSelectOption(option) {
    await this.familleSelect.sendKeys(option);
  }

  getFamilleSelect() {
    return this.familleSelect;
  }

  async getFamilleSelectedOption() {
    return this.familleSelect.element(by.css('option:checked')).getText();
  }

  async typeMaterielSelectLastOption() {
    await this.typeMaterielSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async typeMaterielSelectOption(option) {
    await this.typeMaterielSelect.sendKeys(option);
  }

  getTypeMaterielSelect() {
    return this.typeMaterielSelect;
  }

  async getTypeMaterielSelectedOption() {
    return this.typeMaterielSelect.element(by.css('option:checked')).getText();
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

  async marqueSelectLastOption() {
    await this.marqueSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async marqueSelectOption(option) {
    await this.marqueSelect.sendKeys(option);
  }

  getMarqueSelect() {
    return this.marqueSelect;
  }

  async getMarqueSelectedOption() {
    return this.marqueSelect.element(by.css('option:checked')).getText();
  }

  async documentSelectLastOption() {
    await this.documentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async documentSelectOption(option) {
    await this.documentSelect.sendKeys(option);
  }

  getDocumentSelect() {
    return this.documentSelect;
  }

  async getDocumentSelectedOption() {
    return this.documentSelect.element(by.css('option:checked')).getText();
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
