import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BonCommandeComponentsPage from './bon-commande.page-object';
import BonCommandeUpdatePage from './bon-commande-update.page-object';
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

describe('BonCommande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bonCommandeComponentsPage: BonCommandeComponentsPage;
  let bonCommandeUpdatePage: BonCommandeUpdatePage;

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
    bonCommandeComponentsPage = new BonCommandeComponentsPage();
    bonCommandeComponentsPage = await bonCommandeComponentsPage.goToPage(navBarPage);
  });

  it('should load BonCommandes', async () => {
    expect(await bonCommandeComponentsPage.title.getText()).to.match(/Bon Commandes/);
    expect(await bonCommandeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete BonCommandes', async () => {
        const beforeRecordsCount = await isVisible(bonCommandeComponentsPage.noRecords) ? 0 : await getRecordsCount(bonCommandeComponentsPage.table);
        bonCommandeUpdatePage = await bonCommandeComponentsPage.goToCreateBonCommande();
        await bonCommandeUpdatePage.enterData();

        expect(await bonCommandeComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(bonCommandeComponentsPage.table);
        await waitUntilCount(bonCommandeComponentsPage.records, beforeRecordsCount + 1);
        expect(await bonCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await bonCommandeComponentsPage.deleteBonCommande();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(bonCommandeComponentsPage.records, beforeRecordsCount);
          expect(await bonCommandeComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(bonCommandeComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
