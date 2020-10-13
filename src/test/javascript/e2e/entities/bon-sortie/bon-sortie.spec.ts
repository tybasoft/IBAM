import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BonSortieComponentsPage from './bon-sortie.page-object';
import BonSortieUpdatePage from './bon-sortie-update.page-object';
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

describe('BonSortie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bonSortieComponentsPage: BonSortieComponentsPage;
  let bonSortieUpdatePage: BonSortieUpdatePage;

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
    bonSortieComponentsPage = new BonSortieComponentsPage();
    bonSortieComponentsPage = await bonSortieComponentsPage.goToPage(navBarPage);
  });

  it('should load BonSorties', async () => {
    expect(await bonSortieComponentsPage.title.getText()).to.match(/Bon Sorties/);
    expect(await bonSortieComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete BonSorties', async () => {
        const beforeRecordsCount = await isVisible(bonSortieComponentsPage.noRecords) ? 0 : await getRecordsCount(bonSortieComponentsPage.table);
        bonSortieUpdatePage = await bonSortieComponentsPage.goToCreateBonSortie();
        await bonSortieUpdatePage.enterData();

        expect(await bonSortieComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(bonSortieComponentsPage.table);
        await waitUntilCount(bonSortieComponentsPage.records, beforeRecordsCount + 1);
        expect(await bonSortieComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await bonSortieComponentsPage.deleteBonSortie();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(bonSortieComponentsPage.records, beforeRecordsCount);
          expect(await bonSortieComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(bonSortieComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
