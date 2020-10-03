import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SituationFinanciereUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.situationFinanciere.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  montantFactureInput: ElementFinder = element(by.css('input#situation-financiere-montantFacture'));
  dateFacturationInput: ElementFinder = element(by.css('input#situation-financiere-dateFacturation'));
  montantEnCoursInput: ElementFinder = element(by.css('input#situation-financiere-montantEnCours'));
  projetSelect: ElementFinder = element(by.css('select#situation-financiere-projet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMontantFactureInput(montantFacture) {
    await this.montantFactureInput.sendKeys(montantFacture);
  }

  async getMontantFactureInput() {
    return this.montantFactureInput.getAttribute('value');
  }

  async setDateFacturationInput(dateFacturation) {
    await this.dateFacturationInput.sendKeys(dateFacturation);
  }

  async getDateFacturationInput() {
    return this.dateFacturationInput.getAttribute('value');
  }

  async setMontantEnCoursInput(montantEnCours) {
    await this.montantEnCoursInput.sendKeys(montantEnCours);
  }

  async getMontantEnCoursInput() {
    return this.montantEnCoursInput.getAttribute('value');
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
    await this.setMontantFactureInput('montantFacture');
    expect(await this.getMontantFactureInput()).to.match(/montantFacture/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateFacturationInput('01-01-2001');
    expect(await this.getDateFacturationInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setMontantEnCoursInput('montantEnCours');
    expect(await this.getMontantEnCoursInput()).to.match(/montantEnCours/);
    await this.projetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
