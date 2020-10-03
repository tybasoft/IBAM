import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AvancementComponentsPage from './avancement.page-object';
import AvancementUpdatePage from './avancement-update.page-object';
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

describe('Avancement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let avancementComponentsPage: AvancementComponentsPage;
  let avancementUpdatePage: AvancementUpdatePage;

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
    avancementComponentsPage = new AvancementComponentsPage();
    avancementComponentsPage = await avancementComponentsPage.goToPage(navBarPage);
  });

  it('should load Avancements', async () => {
    expect(await avancementComponentsPage.title.getText()).to.match(/Avancements/);
    expect(await avancementComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Avancements', async () => {
    const beforeRecordsCount = (await isVisible(avancementComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(avancementComponentsPage.table);
    avancementUpdatePage = await avancementComponentsPage.goToCreateAvancement();
    await avancementUpdatePage.enterData();

    expect(await avancementComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(avancementComponentsPage.table);
    await waitUntilCount(avancementComponentsPage.records, beforeRecordsCount + 1);
    expect(await avancementComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await avancementComponentsPage.deleteAvancement();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(avancementComponentsPage.records, beforeRecordsCount);
      expect(await avancementComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(avancementComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
