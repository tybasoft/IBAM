import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FichePointageComponentsPage from './fiche-pointage.page-object';
import FichePointageUpdatePage from './fiche-pointage-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('FichePointage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fichePointageComponentsPage: FichePointageComponentsPage;
  let fichePointageUpdatePage: FichePointageUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    fichePointageComponentsPage = new FichePointageComponentsPage();
    fichePointageComponentsPage = await fichePointageComponentsPage.goToPage(navBarPage);
  });

  it('should load FichePointages', async () => {
    expect(await fichePointageComponentsPage.title.getText()).to.match(/Fiche Pointages/);
    expect(await fichePointageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FichePointages', async () => {
    const beforeRecordsCount = (await isVisible(fichePointageComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fichePointageComponentsPage.table);
    fichePointageUpdatePage = await fichePointageComponentsPage.goToCreateFichePointage();
    await fichePointageUpdatePage.enterData();

    expect(await fichePointageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fichePointageComponentsPage.table);
    await waitUntilCount(fichePointageComponentsPage.records, beforeRecordsCount + 1);
    expect(await fichePointageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fichePointageComponentsPage.deleteFichePointage();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fichePointageComponentsPage.records, beforeRecordsCount);
      expect(await fichePointageComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fichePointageComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
