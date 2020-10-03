import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AffectationMaterielsComponentsPage from './affectation-materiels.page-object';
import AffectationMaterielsUpdatePage from './affectation-materiels-update.page-object';
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

describe('AffectationMateriels e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let affectationMaterielsComponentsPage: AffectationMaterielsComponentsPage;
  let affectationMaterielsUpdatePage: AffectationMaterielsUpdatePage;

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
    affectationMaterielsComponentsPage = new AffectationMaterielsComponentsPage();
    affectationMaterielsComponentsPage = await affectationMaterielsComponentsPage.goToPage(navBarPage);
  });

  it('should load AffectationMateriels', async () => {
    expect(await affectationMaterielsComponentsPage.title.getText()).to.match(/Affectation Materiels/);
    expect(await affectationMaterielsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete AffectationMateriels', async () => {
        const beforeRecordsCount = await isVisible(affectationMaterielsComponentsPage.noRecords) ? 0 : await getRecordsCount(affectationMaterielsComponentsPage.table);
        affectationMaterielsUpdatePage = await affectationMaterielsComponentsPage.goToCreateAffectationMateriels();
        await affectationMaterielsUpdatePage.enterData();

        expect(await affectationMaterielsComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(affectationMaterielsComponentsPage.table);
        await waitUntilCount(affectationMaterielsComponentsPage.records, beforeRecordsCount + 1);
        expect(await affectationMaterielsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await affectationMaterielsComponentsPage.deleteAffectationMateriels();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(affectationMaterielsComponentsPage.records, beforeRecordsCount);
          expect(await affectationMaterielsComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(affectationMaterielsComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
