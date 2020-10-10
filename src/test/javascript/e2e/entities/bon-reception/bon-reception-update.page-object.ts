import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BonReceptionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.bonReception.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  livreurInput: ElementFinder = element(by.css('input#bon-reception-livreur'));
  remarquesInput: ElementFinder = element(by.css('input#bon-reception-remarques'));
  dateLivraisonInput: ElementFinder = element(by.css('input#bon-reception-dateLivraison'));
  userModifInput: ElementFinder = element(by.css('input#bon-reception-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#bon-reception-dateModif'));
  fournisseurSelect: ElementFinder = element(by.css('select#bon-reception-fournisseur'));
  imageSelect: ElementFinder = element(by.css('select#bon-reception-image'));
  projetSelect: ElementFinder = element(by.css('select#bon-reception-projet'));

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
    await this.setLivreurInput('livreur');
    expect(await this.getLivreurInput()).to.match(/livreur/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarquesInput('remarques');
    expect(await this.getRemarquesInput()).to.match(/remarques/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateLivraisonInput('01-01-2001');
    expect(await this.getDateLivraisonInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUserModifInput('userModif');
    expect(await this.getUserModifInput()).to.match(/userModif/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateModifInput('01-01-2001');
    expect(await this.getDateModifInput()).to.eq('2001-01-01');
    await this.fournisseurSelectLastOption();
    await this.imageSelectLastOption();
    await this.projetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
