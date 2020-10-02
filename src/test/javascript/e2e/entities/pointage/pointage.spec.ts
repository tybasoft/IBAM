import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PointageComponentsPage from './pointage.page-object';
import PointageUpdatePage from './pointage-update.page-object';
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

describe('Pointage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pointageComponentsPage: PointageComponentsPage;
  let pointageUpdatePage: PointageUpdatePage;

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
    pointageComponentsPage = new PointageComponentsPage();
    pointageComponentsPage = await pointageComponentsPage.goToPage(navBarPage);
  });

  it('should load Pointages', async () => {
    expect(await pointageComponentsPage.title.getText()).to.match(/Pointages/);
    expect(await pointageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Pointages', async () => {
    const beforeRecordsCount = (await isVisible(pointageComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(pointageComponentsPage.table);
    pointageUpdatePage = await pointageComponentsPage.goToCreatePointage();
    await pointageUpdatePage.enterData();

    expect(await pointageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(pointageComponentsPage.table);
    await waitUntilCount(pointageComponentsPage.records, beforeRecordsCount + 1);
    expect(await pointageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await pointageComponentsPage.deletePointage();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(pointageComponentsPage.records, beforeRecordsCount);
      expect(await pointageComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(pointageComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
