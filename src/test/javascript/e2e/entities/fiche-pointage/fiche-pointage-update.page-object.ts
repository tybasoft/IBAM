import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class FichePointageUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.fichePointage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateJourInput: ElementFinder = element(by.css('input#fiche-pointage-dateJour'));
  projetSelect: ElementFinder = element(by.css('select#fiche-pointage-projet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateJourInput(dateJour) {
    await this.dateJourInput.sendKeys(dateJour);
  }

  async getDateJourInput() {
    return this.dateJourInput.getAttribute('value');
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
    await this.setDateJourInput('01-01-2001');
    expect(await this.getDateJourInput()).to.eq('2001-01-01');
    await this.projetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
