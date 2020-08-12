import { element, by, ElementFinder } from 'protractor';

export default class EmployeUpdatePage {
  pageTitle: ElementFinder = element(by.id('ibamApp.employe.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#employe-nom'));
  prenomInput: ElementFinder = element(by.css('input#employe-prenom'));
  matriculeInput: ElementFinder = element(by.css('input#employe-matricule'));
  cinInput: ElementFinder = element(by.css('input#employe-cin'));
  sexeInput: ElementFinder = element(by.css('input#employe-sexe'));
  tarifJournalierInput: ElementFinder = element(by.css('input#employe-tarifJournalier'));
  dateNaissanceInput: ElementFinder = element(by.css('input#employe-dateNaissance'));
  lieuNaissanceInput: ElementFinder = element(by.css('input#employe-lieuNaissance'));
  situationFamInput: ElementFinder = element(by.css('input#employe-situationFam'));
  nationaliteInput: ElementFinder = element(by.css('input#employe-nationalite'));
  dateEntreeInput: ElementFinder = element(by.css('input#employe-dateEntree'));
  telInput: ElementFinder = element(by.css('input#employe-tel'));
  emailInput: ElementFinder = element(by.css('input#employe-email'));
  adresseInput: ElementFinder = element(by.css('input#employe-adresse'));
  divisionInput: ElementFinder = element(by.css('input#employe-division'));
  typeContratInput: ElementFinder = element(by.css('input#employe-typeContrat'));
  multiPorjetInput: ElementFinder = element(by.css('input#employe-multiPorjet'));
  dateDepartInput: ElementFinder = element(by.css('input#employe-dateDepart'));
  motifDepartInput: ElementFinder = element(by.css('input#employe-motifDepart'));
  userModifInput: ElementFinder = element(by.css('input#employe-userModif'));
  dateModifInput: ElementFinder = element(by.css('input#employe-dateModif'));
  projetSelect: ElementFinder = element(by.css('select#employe-projet'));
  equipeSelect: ElementFinder = element(by.css('select#employe-equipe'));
  fonctionSelect: ElementFinder = element(by.css('select#employe-fonction'));
  imageSelect: ElementFinder = element(by.css('select#employe-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom) {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput() {
    return this.prenomInput.getAttribute('value');
  }

  async setMatriculeInput(matricule) {
    await this.matriculeInput.sendKeys(matricule);
  }

  async getMatriculeInput() {
    return this.matriculeInput.getAttribute('value');
  }

  async setCinInput(cin) {
    await this.cinInput.sendKeys(cin);
  }

  async getCinInput() {
    return this.cinInput.getAttribute('value');
  }

  async setSexeInput(sexe) {
    await this.sexeInput.sendKeys(sexe);
  }

  async getSexeInput() {
    return this.sexeInput.getAttribute('value');
  }

  async setTarifJournalierInput(tarifJournalier) {
    await this.tarifJournalierInput.sendKeys(tarifJournalier);
  }

  async getTarifJournalierInput() {
    return this.tarifJournalierInput.getAttribute('value');
  }

  async setDateNaissanceInput(dateNaissance) {
    await this.dateNaissanceInput.sendKeys(dateNaissance);
  }

  async getDateNaissanceInput() {
    return this.dateNaissanceInput.getAttribute('value');
  }

  async setLieuNaissanceInput(lieuNaissance) {
    await this.lieuNaissanceInput.sendKeys(lieuNaissance);
  }

  async getLieuNaissanceInput() {
    return this.lieuNaissanceInput.getAttribute('value');
  }

  async setSituationFamInput(situationFam) {
    await this.situationFamInput.sendKeys(situationFam);
  }

  async getSituationFamInput() {
    return this.situationFamInput.getAttribute('value');
  }

  async setNationaliteInput(nationalite) {
    await this.nationaliteInput.sendKeys(nationalite);
  }

  async getNationaliteInput() {
    return this.nationaliteInput.getAttribute('value');
  }

  async setDateEntreeInput(dateEntree) {
    await this.dateEntreeInput.sendKeys(dateEntree);
  }

  async getDateEntreeInput() {
    return this.dateEntreeInput.getAttribute('value');
  }

  async setTelInput(tel) {
    await this.telInput.sendKeys(tel);
  }

  async getTelInput() {
    return this.telInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
  }

  async setDivisionInput(division) {
    await this.divisionInput.sendKeys(division);
  }

  async getDivisionInput() {
    return this.divisionInput.getAttribute('value');
  }

  async setTypeContratInput(typeContrat) {
    await this.typeContratInput.sendKeys(typeContrat);
  }

  async getTypeContratInput() {
    return this.typeContratInput.getAttribute('value');
  }

  getMultiPorjetInput() {
    return this.multiPorjetInput;
  }
  async setDateDepartInput(dateDepart) {
    await this.dateDepartInput.sendKeys(dateDepart);
  }

  async getDateDepartInput() {
    return this.dateDepartInput.getAttribute('value');
  }

  async setMotifDepartInput(motifDepart) {
    await this.motifDepartInput.sendKeys(motifDepart);
  }

  async getMotifDepartInput() {
    return this.motifDepartInput.getAttribute('value');
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

  async equipeSelectLastOption() {
    await this.equipeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async equipeSelectOption(option) {
    await this.equipeSelect.sendKeys(option);
  }

  getEquipeSelect() {
    return this.equipeSelect;
  }

  async getEquipeSelectedOption() {
    return this.equipeSelect.element(by.css('option:checked')).getText();
  }

  async fonctionSelectLastOption() {
    await this.fonctionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fonctionSelectOption(option) {
    await this.fonctionSelect.sendKeys(option);
  }

  getFonctionSelect() {
    return this.fonctionSelect;
  }

  async getFonctionSelectedOption() {
    return this.fonctionSelect.element(by.css('option:checked')).getText();
  }

  async imageSelectLastOption() {
    await this.imageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async imageSelectOption(option) {
    await this.imageSelect.sendKeys(option);
  }

  getImageSelect() {
    return this.imageSelect;
  }

  async getImageSelectedOption() {
    return this.imageSelect.element(by.css('option:checked')).getText();
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
