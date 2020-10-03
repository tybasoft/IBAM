import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LigneBonCommandeComponentsPage from './ligne-bon-commande.page-object';
import LigneBonCommandeUpdatePage from './ligne-bon-commande-update.page-object';
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

describe('LigneBonCommande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ligneBonCommandeComponentsPage: LigneBonCommandeComponentsPage;
  let ligneBonCommandeUpdatePage: LigneBonCommandeUpdatePage;

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
    ligneBonCommandeComponentsPage = new LigneBonCommandeComponentsPage();
    ligneBonCommandeComponentsPage = await ligneBonCommandeComponentsPage.goToPage(navBarPage);
  });

  it('should load LigneBonCommandes', async () => {
    expect(await ligneBonCommandeComponentsPage.title.getText()).to.match(/Ligne Bon Commandes/);
    expect(await ligneBonCommandeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete LigneBonCommandes', async () => {
    const beforeRecordsCount = (await isVisible(ligneBonCommandeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ligneBonCommandeComponentsPage.table);
    ligneBonCommandeUpdatePage = await ligneBonCommandeComponentsPage.goToCreateLigneBonCommande();
    await ligneBonCommandeUpdatePage.enterData();

    expect(await ligneBonCommandeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ligneBonCommandeComponentsPage.table);
    await waitUntilCount(ligneBonCommandeComponentsPage.records, beforeRecordsCount + 1);
    expect(await ligneBonCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ligneBonCommandeComponentsPage.deleteLigneBonCommande();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ligneBonCommandeComponentsPage.records, beforeRecordsCount);
      expect(await ligneBonCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ligneBonCommandeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
