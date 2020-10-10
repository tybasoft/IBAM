import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BonReceptionComponentsPage from './bon-reception.page-object';
import BonReceptionUpdatePage from './bon-reception-update.page-object';
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

describe('BonReception e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bonReceptionComponentsPage: BonReceptionComponentsPage;
  let bonReceptionUpdatePage: BonReceptionUpdatePage;

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
    bonReceptionComponentsPage = new BonReceptionComponentsPage();
    bonReceptionComponentsPage = await bonReceptionComponentsPage.goToPage(navBarPage);
  });

  it('should load BonReceptions', async () => {
    expect(await bonReceptionComponentsPage.title.getText()).to.match(/Bon Receptions/);
    expect(await bonReceptionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete BonReceptions', async () => {
        const beforeRecordsCount = await isVisible(bonReceptionComponentsPage.noRecords) ? 0 : await getRecordsCount(bonReceptionComponentsPage.table);
        bonReceptionUpdatePage = await bonReceptionComponentsPage.goToCreateBonReception();
        await bonReceptionUpdatePage.enterData();

        expect(await bonReceptionComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(bonReceptionComponentsPage.table);
        await waitUntilCount(bonReceptionComponentsPage.records, beforeRecordsCount + 1);
        expect(await bonReceptionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await bonReceptionComponentsPage.deleteBonReception();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(bonReceptionComponentsPage.records, beforeRecordsCount);
          expect(await bonReceptionComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(bonReceptionComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
