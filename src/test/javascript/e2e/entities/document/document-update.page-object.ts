import { element, by, ElementFinder } from 'protractor';

export default class DocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.document.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titreInput: ElementFinder = element(by.css('input#document-titre'));
  typeInput: ElementFinder = element(by.css('input#document-type'));
  pathInput: ElementFinder = element(by.css('input#document-path'));
  commentaireInput: ElementFinder = element(by.css('input#document-commentaire'));
  userModifInput: ElementFinder = element(by.css('input#document-userModif'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitreInput(titre) {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput() {
    return this.titreInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setPathInput(path) {
    await this.pathInput.sendKeys(path);
  }

  async getPathInput() {
    return this.pathInput.getAttribute('value');
  }

  async setCommentaireInput(commentaire) {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput() {
    return this.commentaireInput.getAttribute('value');
  }

  async setUserModifInput(userModif) {
    await this.userModifInput.sendKeys(userModif);
  }

  async getUserModifInput() {
    return this.userModifInput.getAttribute('value');
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
