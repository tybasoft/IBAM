import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PointageUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.pointage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateJourInput: ElementFinder = element(by.css('input#pointage-dateJour'));
  presenceMatinInput: ElementFinder = element(by.css('input#pointage-presenceMatin'));
  presenceAPMInput: ElementFinder = element(by.css('input#pointage-presenceAPM'));
  nbrHeureSupInput: ElementFinder = element(by.css('input#pointage-nbrHeureSup'));
  remarquesInput: ElementFinder = element(by.css('input#pointage-remarques'));
  userModifInput: ElementFinder = element(by.css('input#pointage-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#pointage-dateModif'));
  employeSelect: ElementFinder = element(by.css('select#pointage-employe'));
  fichePointageSelect: ElementFinder = element(by.css('select#pointage-fichePointage'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateJourInput(dateJour) {
    await this.dateJourInput.sendKeys(dateJour);
  }

  async getDateJourInput() {
    return this.dateJourInput.getAttribute('value');
  }

  getPresenceMatinInput() {
    return this.presenceMatinInput;
  }
  getPresenceAPMInput() {
    return this.presenceAPMInput;
  }
  async setNbrHeureSupInput(nbrHeureSup) {
    await this.nbrHeureSupInput.sendKeys(nbrHeureSup);
  }

  async getNbrHeureSupInput() {
    return this.nbrHeureSupInput.getAttribute('value');
  }

  async setRemarquesInput(remarques) {
    await this.remarquesInput.sendKeys(remarques);
  }

  async getRemarquesInput() {
    return this.remarquesInput.getAttribute('value');
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

  async fichePointageSelectLastOption() {
    await this.fichePointageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fichePointageSelectOption(option) {
    await this.fichePointageSelect.sendKeys(option);
  }

  getFichePointageSelect() {
    return this.fichePointageSelect;
  }

  async getFichePointageSelectedOption() {
    return this.fichePointageSelect.element(by.css('option:checked')).getText();
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
    await waitUntilDisplayed(this.saveButton);
    const selectedPresenceMatin = await this.getPresenceMatinInput().isSelected();
    if (selectedPresenceMatin) {
      await this.getPresenceMatinInput().click();
      expect(await this.getPresenceMatinInput().isSelected()).to.be.false;
    } else {
      await this.getPresenceMatinInput().click();
      expect(await this.getPresenceMatinInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedPresenceAPM = await this.getPresenceAPMInput().isSelected();
    if (selectedPresenceAPM) {
      await this.getPresenceAPMInput().click();
      expect(await this.getPresenceAPMInput().isSelected()).to.be.false;
    } else {
      await this.getPresenceAPMInput().click();
      expect(await this.getPresenceAPMInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setNbrHeureSupInput('nbrHeureSup');
    expect(await this.getNbrHeureSupInput()).to.match(/nbrHeureSup/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarquesInput('remarques');
    expect(await this.getRemarquesInput()).to.match(/remarques/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUserModifInput('userModif');
    expect(await this.getUserModifInput()).to.match(/userModif/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateModifInput('01-01-2001');
    expect(await this.getDateModifInput()).to.eq('2001-01-01');
    await this.employeSelectLastOption();
    await this.fichePointageSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
