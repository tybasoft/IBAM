import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AffectationMaterielsUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.affectationMateriels.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateDebutInput: ElementFinder = element(by.css('input#affectation-materiels-dateDebut'));
  dateFinInput: ElementFinder = element(by.css('input#affectation-materiels-dateFin'));
  descriptionInput: ElementFinder = element(by.css('input#affectation-materiels-description'));
  projetSelect: ElementFinder = element(by.css('select#affectation-materiels-projet'));
  materielSelect: ElementFinder = element(by.css('select#affectation-materiels-materiel'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateDebutInput(dateDebut) {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput() {
    return this.dateDebutInput.getAttribute('value');
  }

  async setDateFinInput(dateFin) {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput() {
    return this.dateFinInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
    await this.setDateDebutInput('01-01-2001');
    expect(await this.getDateDebutInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateFinInput('01-01-2001');
    expect(await this.getDateFinInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.projetSelectLastOption();
    await this.materielSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
