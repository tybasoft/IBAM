import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MaterielComponentsPage from './materiel.page-object';
import MaterielUpdatePage from './materiel-update.page-object';
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

describe('Materiel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let materielComponentsPage: MaterielComponentsPage;
  let materielUpdatePage: MaterielUpdatePage;

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
    materielComponentsPage = new MaterielComponentsPage();
    materielComponentsPage = await materielComponentsPage.goToPage(navBarPage);
  });

  it('should load Materiels', async () => {
    expect(await materielComponentsPage.title.getText()).to.match(/Materiels/);
    expect(await materielComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Materiels', async () => {
    const beforeRecordsCount = (await isVisible(materielComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(materielComponentsPage.table);
    materielUpdatePage = await materielComponentsPage.goToCreateMateriel();
    await materielUpdatePage.enterData();

    expect(await materielComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(materielComponentsPage.table);
    await waitUntilCount(materielComponentsPage.records, beforeRecordsCount + 1);
    expect(await materielComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await materielComponentsPage.deleteMateriel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(materielComponentsPage.records, beforeRecordsCount);
      expect(await materielComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(materielComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
