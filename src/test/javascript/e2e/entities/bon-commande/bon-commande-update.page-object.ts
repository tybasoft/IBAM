import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

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
  fournisseurSelect: ElementFinder = element(by.css('select#bon-commande-fournisseur'));
  projetSelect: ElementFinder = element(by.css('select#bon-commande-projet'));

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
    await this.setDatePrevLivInput('01-01-2001');
    expect(await this.getDatePrevLivInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarquesInput('remarques');
    expect(await this.getRemarquesInput()).to.match(/remarques/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateCreationInput('01-01-2001');
    expect(await this.getDateCreationInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    const selectedValide = await this.getValideInput().isSelected();
    if (selectedValide) {
      await this.getValideInput().click();
      expect(await this.getValideInput().isSelected()).to.be.false;
    } else {
      await this.getValideInput().click();
      expect(await this.getValideInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setUserModifInput('userModif');
    expect(await this.getUserModifInput()).to.match(/userModif/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateModifInput('01-01-2001');
    expect(await this.getDateModifInput()).to.eq('2001-01-01');
    await this.fournisseurSelectLastOption();
    await this.projetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
