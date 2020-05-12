import { element, by, ElementFinder } from 'protractor';

export default class LigneBonCommandeUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.ligneBonCommande.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantiteInput: ElementFinder = element(by.css('input#ligne-bon-commande-quantite'));
  userModifInput: ElementFinder = element(by.css('input#ligne-bon-commande-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#ligne-bon-commande-dateModif'));
  bonCommandeSelect: ElementFinder = element(by.css('select#ligne-bon-commande-bonCommande'));
  materiauSelect: ElementFinder = element(by.css('select#ligne-bon-commande-materiau'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantiteInput(quantite) {
    await this.quantiteInput.sendKeys(quantite);
  }

  async getQuantiteInput() {
    return this.quantiteInput.getAttribute('value');
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

  async bonCommandeSelectLastOption() {
    await this.bonCommandeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bonCommandeSelectOption(option) {
    await this.bonCommandeSelect.sendKeys(option);
  }

  getBonCommandeSelect() {
    return this.bonCommandeSelect;
  }

  async getBonCommandeSelectedOption() {
    return this.bonCommandeSelect.element(by.css('option:checked')).getText();
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

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
