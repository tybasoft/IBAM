import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BonSortieUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.bonSortie.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateSortieInput: ElementFinder = element(by.css('input#bon-sortie-dateSortie'));
  dateCreationInput: ElementFinder = element(by.css('input#bon-sortie-dateCreation'));
  userModifInput: ElementFinder = element(by.css('input#bon-sortie-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#bon-sortie-dateModif'));
  remarquesInput: ElementFinder = element(by.css('input#bon-sortie-remarques'));
  projetSelect: ElementFinder = element(by.css('select#bon-sortie-projet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateSortieInput(dateSortie) {
    await this.dateSortieInput.sendKeys(dateSortie);
  }

  async getDateSortieInput() {
    return this.dateSortieInput.getAttribute('value');
  }

  async setDateCreationInput(dateCreation) {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput() {
    return this.dateCreationInput.getAttribute('value');
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

  async setRemarquesInput(remarques) {
    await this.remarquesInput.sendKeys(remarques);
  }

  async getRemarquesInput() {
    return this.remarquesInput.getAttribute('value');
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
    await this.setDateSortieInput('01-01-2001');
    expect(await this.getDateSortieInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateCreationInput('01-01-2001');
    expect(await this.getDateCreationInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUserModifInput('userModif');
    expect(await this.getUserModifInput()).to.match(/userModif/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateModifInput('01-01-2001');
    expect(await this.getDateModifInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarquesInput('remarques');
    expect(await this.getRemarquesInput()).to.match(/remarques/);
    await this.projetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
