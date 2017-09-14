import 'jasmine'
import { ProjectMultiOppPage } from '../../../po/project.multi-opp.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut, setUsersWithPartialProfile, updateData } from '../../../firebase';
import { USER_NOT_VERIFIED } from '../../../fixtures/users';
import { confirmPage } from '../../helper-functions/shared';
import { joinATeam } from '../../helper-functions/choose-teams/choose-teams-functions';
import { UserHomePage } from '../../../po/user-home.po';
import { OpportunityPage } from '../../../po/opp.partial-discount.po';


describe('Apply-Multiple-Opportunity-Flow: user not verified', () => {
    let LCprojectPage: ProjectMultiOppPage
    let homePage: UserHomePage
    let oppLCPage: OpportunityPage

    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
    const waitTimeout = 5000

    beforeAll(done => {
        LCprojectPage = new ProjectMultiOppPage();
        oppLCPage = new OpportunityPage()
        homePage = new UserHomePage()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(USER_NOT_VERIFIED.email, USER_NOT_VERIFIED.password))
            .then(done)
    });

    it('It should be able to choose LC Event and after pressing join '
        + 'it will be taken to Email-not-verified screen ', function () {
            let LCProjectLink = homePage.getProjectLink(1)
            browser.wait(ExpectedConditions.presenceOf(LCProjectLink),
                waitTimeout, 'Link to LC project was not present')
            homePage.getProjectTitle(LCProjectLink).click()
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(LCprojectPage.getFirstOportunityTitleElement()),
                        waitTimeout, 'Link to the first opportunity of LC was not present')
                    return LCprojectPage.getFirstOportunityTitleElement().click()
                })
                .then(() => {
                    let join = oppLCPage.getJoinButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(join),
                        waitTimeout, 'Join opportunity button was not present')
                    return join.click()
                })
                .then(() => confirmPage('/auth/email-not-verified', '', 'Email-not-verified', 'first', waitTimeout))
            expect(true).toBeTruthy()

        })


})
