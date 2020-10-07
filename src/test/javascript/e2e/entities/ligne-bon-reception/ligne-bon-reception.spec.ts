import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LigneBonReceptionComponentsPage from './ligne-bon-reception.page-object';
import LigneBonReceptionUpdatePage from './ligne-bon-reception-update.page-object';
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

describe('LigneBonReception e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ligneBonReceptionComponentsPage: LigneBonReceptionComponentsPage;
  let ligneBonReceptionUpdatePage: LigneBonReceptionUpdatePage;

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
    ligneBonReceptionComponentsPage = new LigneBonReceptionComponentsPage();
    ligneBonReceptionComponentsPage = await ligneBonReceptionComponentsPage.goToPage(navBarPage);
  });

  it('should load LigneBonReceptions', async () => {
    expect(await ligneBonReceptionComponentsPage.title.getText()).to.match(/Ligne Bon Receptions/);
    expect(await ligneBonReceptionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete LigneBonReceptions', async () => {
    const beforeRecordsCount = (await isVisible(ligneBonReceptionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneBonReceptionComponentsPage.table);
    ligneBonReceptionUpdatePage = await ligneBonReceptionComponentsPage.goToCreateLigneBonReception();
    await ligneBonReceptionUpdatePage.enterData();

    expect(await ligneBonReceptionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ligneBonReceptionComponentsPage.table);
    await waitUntilCount(ligneBonReceptionComponentsPage.records, beforeRecordsCount + 1);
    expect(await ligneBonReceptionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ligneBonReceptionComponentsPage.deleteLigneBonReception();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ligneBonReceptionComponentsPage.records, beforeRecordsCount);
      expect(await ligneBonReceptionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ligneBonReceptionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
