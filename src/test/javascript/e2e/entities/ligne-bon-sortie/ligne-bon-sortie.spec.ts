import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LigneBonSortieComponentsPage from './ligne-bon-sortie.page-object';
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

describe('LigneBonSortie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ligneBonSortieComponentsPage: LigneBonSortieComponentsPage;

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
    ligneBonSortieComponentsPage = new LigneBonSortieComponentsPage();
    ligneBonSortieComponentsPage = await ligneBonSortieComponentsPage.goToPage(navBarPage);
  });

  it('should load LigneBonSorties', async () => {
    expect(await ligneBonSortieComponentsPage.title.getText()).to.match(/Ligne Bon Sorties/);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
