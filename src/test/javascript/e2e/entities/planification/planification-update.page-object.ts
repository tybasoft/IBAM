import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PlanificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.planification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nom_tacheInput: ElementFinder = element(by.css('input#planification-nom_tache'));
  description_tacheInput: ElementFinder = element(by.css('input#planification-description_tache'));
  date_debutInput: ElementFinder = element(by.css('input#planification-date_debut'));
  date_finInput: ElementFinder = element(by.css('input#planification-date_fin'));
  employeSelect: ElementFinder = element(by.css('select#planification-employe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNom_tacheInput(nom_tache) {
    await this.nom_tacheInput.sendKeys(nom_tache);
  }

  async getNom_tacheInput() {
    return this.nom_tacheInput.getAttribute('value');
  }

  async setDescription_tacheInput(description_tache) {
    await this.description_tacheInput.sendKeys(description_tache);
  }

  async getDescription_tacheInput() {
    return this.description_tacheInput.getAttribute('value');
  }

  async setDate_debutInput(date_debut) {
    await this.date_debutInput.sendKeys(date_debut);
  }

  async getDate_debutInput() {
    return this.date_debutInput.getAttribute('value');
  }

  async setDate_finInput(date_fin) {
    await this.date_finInput.sendKeys(date_fin);
  }

  async getDate_finInput() {
    return this.date_finInput.getAttribute('value');
  }

  async employeSelectLastOption() {
    await this.employeSelect.all(by.tagName('option')).last().click();
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
    await this.setNom_tacheInput('nom_tache');
    expect(await this.getNom_tacheInput()).to.match(/nom_tache/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescription_tacheInput('description_tache');
    expect(await this.getDescription_tacheInput()).to.match(/description_tache/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDate_debutInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDate_debutInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setDate_finInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDate_finInput()).to.contain('2001-01-01T02:30');
    // this.employeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
