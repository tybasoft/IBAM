import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SituationFinanciereComponentsPage from './situation-financiere.page-object';
import SituationFinanciereUpdatePage from './situation-financiere-update.page-object';
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

describe('SituationFinanciere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let situationFinanciereComponentsPage: SituationFinanciereComponentsPage;
  let situationFinanciereUpdatePage: SituationFinanciereUpdatePage;

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
    situationFinanciereComponentsPage = new SituationFinanciereComponentsPage();
    situationFinanciereComponentsPage = await situationFinanciereComponentsPage.goToPage(navBarPage);
  });

  it('should load SituationFinancieres', async () => {
    expect(await situationFinanciereComponentsPage.title.getText()).to.match(/Situation Financieres/);
    expect(await situationFinanciereComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete SituationFinancieres', async () => {
        const beforeRecordsCount = await isVisible(situationFinanciereComponentsPage.noRecords) ? 0 : await getRecordsCount(situationFinanciereComponentsPage.table);
        situationFinanciereUpdatePage = await situationFinanciereComponentsPage.goToCreateSituationFinanciere();
        await situationFinanciereUpdatePage.enterData();

        expect(await situationFinanciereComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(situationFinanciereComponentsPage.table);
        await waitUntilCount(situationFinanciereComponentsPage.records, beforeRecordsCount + 1);
        expect(await situationFinanciereComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await situationFinanciereComponentsPage.deleteSituationFinanciere();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(situationFinanciereComponentsPage.records, beforeRecordsCount);
          expect(await situationFinanciereComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(situationFinanciereComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
