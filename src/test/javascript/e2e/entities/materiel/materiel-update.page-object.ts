import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

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
  multiProjetInput: ElementFinder = element(by.css('input#materiel-multiProjet'));
  familleSelect: ElementFinder = element(by.css('select#materiel-famille'));
  typeMaterielSelect: ElementFinder = element(by.css('select#materiel-typeMateriel'));
  fournisseurSelect: ElementFinder = element(by.css('select#materiel-fournisseur'));
  marqueSelect: ElementFinder = element(by.css('select#materiel-marque'));
  documentSelect: ElementFinder = element(by.css('select#materiel-document'));
  employeSelect: ElementFinder = element(by.css('select#materiel-employe'));
  imageSelect: ElementFinder = element(by.css('select#materiel-image'));
  projetSelect: ElementFinder = element(by.css('select#materiel-projet'));

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

  getMultiProjetInput() {
    return this.multiProjetInput;
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

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setLibelleInput('libelle');
    expect(await this.getLibelleInput()).to.match(/libelle/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMatriculeInput('matricule');
    expect(await this.getMatriculeInput()).to.match(/matricule/);
    await waitUntilDisplayed(this.saveButton);
    await this.setModeleInput('modele');
    expect(await this.getModeleInput()).to.match(/modele/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNumCarteGriseInput('numCarteGrise');
    expect(await this.getNumCarteGriseInput()).to.match(/numCarteGrise/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateIdentificationInput('01-01-2001');
    expect(await this.getDateIdentificationInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompteurAchatInput('compteurAchat');
    expect(await this.getCompteurAchatInput()).to.match(/compteurAchat/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEtatInput('etat');
    expect(await this.getEtatInput()).to.match(/etat/);
    await waitUntilDisplayed(this.saveButton);
    const selectedLocation = await this.getLocationInput().isSelected();
    if (selectedLocation) {
      await this.getLocationInput().click();
      expect(await this.getLocationInput().isSelected()).to.be.false;
    } else {
      await this.getLocationInput().click();
      expect(await this.getLocationInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUserModifInput('userModif');
    expect(await this.getUserModifInput()).to.match(/userModif/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateModifInput('01-01-2001');
    expect(await this.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    const selectedMultiProjet = await this.getMultiProjetInput().isSelected();
    if (selectedMultiProjet) {
      await this.getMultiProjetInput().click();
      expect(await this.getMultiProjetInput().isSelected()).to.be.false;
    } else {
      await this.getMultiProjetInput().click();
      expect(await this.getMultiProjetInput().isSelected()).to.be.true;
    }
    await this.familleSelectLastOption();
    await this.typeMaterielSelectLastOption();
    await this.fournisseurSelectLastOption();
    await this.marqueSelectLastOption();
    await this.documentSelectLastOption();
    await this.employeSelectLastOption();
    await this.imageSelectLastOption();
    await this.projetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
