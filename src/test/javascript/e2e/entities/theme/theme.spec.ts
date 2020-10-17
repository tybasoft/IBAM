import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ThemeComponentsPage from './theme.page-object';
import ThemeUpdatePage from './theme-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Theme e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let themeComponentsPage: ThemeComponentsPage;
  let themeUpdatePage: ThemeUpdatePage;

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
    themeComponentsPage = new ThemeComponentsPage();
    themeComponentsPage = await themeComponentsPage.goToPage(navBarPage);
  });

  it('should load Themes', async () => {
    expect(await themeComponentsPage.title.getText()).to.match(/Themes/);
    expect(await themeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Themes', async () => {
    const beforeRecordsCount = (await isVisible(themeComponentsPage.noRecords)) ? 0 : await getRecordsCount(themeComponentsPage.table);
    themeUpdatePage = await themeComponentsPage.goToCreateTheme();
    await themeUpdatePage.enterData();

    expect(await themeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(themeComponentsPage.table);
    await waitUntilCount(themeComponentsPage.records, beforeRecordsCount + 1);
    expect(await themeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await themeComponentsPage.deleteTheme();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(themeComponentsPage.records, beforeRecordsCount);
      expect(await themeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(themeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
