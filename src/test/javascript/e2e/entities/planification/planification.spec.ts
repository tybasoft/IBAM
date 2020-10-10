import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PlanificationComponentsPage from './planification.page-object';
import PlanificationUpdatePage from './planification-update.page-object';
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

describe('Planification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planificationComponentsPage: PlanificationComponentsPage;
  let planificationUpdatePage: PlanificationUpdatePage;

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
    planificationComponentsPage = new PlanificationComponentsPage();
    planificationComponentsPage = await planificationComponentsPage.goToPage(navBarPage);
  });

  it('should load Planifications', async () => {
    expect(await planificationComponentsPage.title.getText()).to.match(/Planifications/);
    expect(await planificationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Planifications', async () => {
    const beforeRecordsCount = (await isVisible(planificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(planificationComponentsPage.table);
    planificationUpdatePage = await planificationComponentsPage.goToCreatePlanification();
    await planificationUpdatePage.enterData();

    expect(await planificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(planificationComponentsPage.table);
    await waitUntilCount(planificationComponentsPage.records, beforeRecordsCount + 1);
    expect(await planificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await planificationComponentsPage.deletePlanification();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(planificationComponentsPage.records, beforeRecordsCount);
      expect(await planificationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(planificationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
