import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AvancementUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.avancement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  createdAtInput: ElementFinder = element(by.css('input#avancement-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#avancement-updatedAt'));
  titreCompteRenduInput: ElementFinder = element(by.css('input#avancement-titreCompteRendu'));
  contenuCompteRenduInput: ElementFinder = element(by.css('textarea#avancement-contenuCompteRendu'));
  employeSelect: ElementFinder = element(by.css('select#avancement-employe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt) {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput() {
    return this.updatedAtInput.getAttribute('value');
  }

  async setTitreCompteRenduInput(titreCompteRendu) {
    await this.titreCompteRenduInput.sendKeys(titreCompteRendu);
  }

  async getTitreCompteRenduInput() {
    return this.titreCompteRenduInput.getAttribute('value');
  }

  async setContenuCompteRenduInput(contenuCompteRendu) {
    await this.contenuCompteRenduInput.sendKeys(contenuCompteRendu);
  }

  async getContenuCompteRenduInput() {
    return this.contenuCompteRenduInput.getAttribute('value');
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
    await this.setCreatedAtInput('01-01-2001');
    expect(await this.getCreatedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01-01-2001');
    expect(await this.getUpdatedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setTitreCompteRenduInput('titreCompteRendu');
    expect(await this.getTitreCompteRenduInput()).to.match(/titreCompteRendu/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContenuCompteRenduInput('contenuCompteRendu');
    expect(await this.getContenuCompteRenduInput()).to.match(/contenuCompteRendu/);
    await this.employeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
