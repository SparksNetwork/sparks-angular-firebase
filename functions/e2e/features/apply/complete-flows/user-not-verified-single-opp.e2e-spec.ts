import 'jasmine'
import { ProjectSingleOppPage } from '../../../po/project.single-opp.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut, setUsersWithPartialProfile, updateData } from '../../../firebase';
import { USER_NOT_VERIFIED } from '../../../fixtures/users';
import { confirmPage } from '../../helper-functions/shared';
import { joinATeam } from '../../helper-functions/choose-teams/choose-teams-functions';
import { UserHomePage } from '../../../po/user-home.po';


describe('Apply-Single-Opportunity-Flow: user not verified', () => {
    let KPCprojectPage: ProjectSingleOppPage
    let homePage: UserHomePage

    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
    const waitTimeout = 5000

    beforeAll(done => {
        KPCprojectPage = new ProjectSingleOppPage();
        homePage = new UserHomePage()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(USER_NOT_VERIFIED.email, USER_NOT_VERIFIED.password))
            .then(done)
    });

    it('It should be able to choose KPC Event and after pressing join '
        + 'it will be taken to Email-not-verified screen ', function () {
            let KPCProjectLink = homePage.getProjectLink(0)
            browser.wait(ExpectedConditions.presenceOf(KPCProjectLink),
                waitTimeout, 'Link to KPC project was not present')
            homePage.getProjectTitle(KPCProjectLink).click()
                .then(() =>
                    browser.wait(ExpectedConditions.elementToBeClickable(KPCprojectPage.getJoinButton()),
                        waitTimeout, 'Join button was not present'))
                .then(() => KPCprojectPage.getJoinButton().click())
                .then(() => confirmPage('/auth/email-not-verified', '', 'Email-not-verified', 'first', waitTimeout))
            expect(true).toBeTruthy()

        })


})
