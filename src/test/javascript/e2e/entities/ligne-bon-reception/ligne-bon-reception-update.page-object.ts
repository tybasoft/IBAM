import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LigneBonReceptionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.ligneBonReception.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantiteInput: ElementFinder = element(by.css('input#ligne-bon-reception-quantite'));
  prixHtInput: ElementFinder = element(by.css('input#ligne-bon-reception-prixHt'));
  userModifInput: ElementFinder = element(by.css('input#ligne-bon-reception-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#ligne-bon-reception-dateModif'));
  bonReceptionSelect: ElementFinder = element(by.css('select#ligne-bon-reception-bonReception'));
  materiauSelect: ElementFinder = element(by.css('select#ligne-bon-reception-materiau'));
  materielSelect: ElementFinder = element(by.css('select#ligne-bon-reception-materiel'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantiteInput(quantite) {
    await this.quantiteInput.sendKeys(quantite);
  }

  async getQuantiteInput() {
    return this.quantiteInput.getAttribute('value');
  }

  async setPrixHtInput(prixHt) {
    await this.prixHtInput.sendKeys(prixHt);
  }

  async getPrixHtInput() {
    return this.prixHtInput.getAttribute('value');
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

  async bonReceptionSelectLastOption() {
    await this.bonReceptionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bonReceptionSelectOption(option) {
    await this.bonReceptionSelect.sendKeys(option);
  }

  getBonReceptionSelect() {
    return this.bonReceptionSelect;
  }

  async getBonReceptionSelectedOption() {
    return this.bonReceptionSelect.element(by.css('option:checked')).getText();
  }

  async materiauSelectLastOption() {
    await this.materiauSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async materiauSelectOption(option) {
    await this.materiauSelect.sendKeys(option);
  }

  getMateriauSelect() {
    return this.materiauSelect;
  }

  async getMateriauSelectedOption() {
    return this.materiauSelect.element(by.css('option:checked')).getText();
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
    await this.setQuantiteInput('quantite');
    expect(await this.getQuantiteInput()).to.match(/quantite/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPrixHtInput('prixHt');
    expect(await this.getPrixHtInput()).to.match(/prixHt/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUserModifInput('userModif');
    expect(await this.getUserModifInput()).to.match(/userModif/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateModifInput('01-01-2001');
    expect(await this.getDateModifInput()).to.eq('2001-01-01');
    await this.bonReceptionSelectLastOption();
    await this.materiauSelectLastOption();
    await this.materielSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
