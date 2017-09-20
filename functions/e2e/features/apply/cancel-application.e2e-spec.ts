import 'jasmine'
import { UserHomePage } from '../../po/user-home.po';
import { ProjectMultiOppPage } from '../../po/project.multi-opp.po';
import { OpportunityPage } from '../../po/opp.partial-discount.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signOut, signIn } from '../../firebase';
import { SignInPage } from '../../po/sign-in.po';
import { CancelApplicationPage } from '../../po/apply.cancel.po';
import { confirmPage } from '../helper-functions/shared';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { testKarmaPoints, testCommunityBenefit, testBenefit } from '../helper-functions/opportunity/opportunity';


fdescribe('Cancel-Applicaton-Multiple-Opportunity: verified user with complete profile information', () => {
    let homePage: UserHomePage
    let LCprojectPage: ProjectMultiOppPage
    let oppLCPage: OpportunityPage
    let signInPage: SignInPage
    let cancelApplicationPage: CancelApplicationPage

    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const waitTimeout = 5000
    const answerToOrganizerQuestion = 'I want to help'


    beforeAll(done => {
        homePage = new UserHomePage();
        LCprojectPage = new ProjectMultiOppPage();
        oppLCPage = new OpportunityPage();
        signInPage = new SignInPage()
        cancelApplicationPage = new CancelApplicationPage()

        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            //!!!TODO DELETE THE FOLLOWING 3 LINES WHEN VERIFICATION WAS FIXED
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password))
            .then(done)
    })

    describe('Exploring Cancel-application page', () => {
        beforeAll(done => {


            cancelApplicationPage.navigateTo()
                //TODO UNCOMMENT THIS WHEN VALIDATION IS FIXED  
                //.then(() => confirmPage('/auth/%2Fproject/%2FLC%2Fopp%2FLC1/%2FLC-USER_VERIFIED_PROFILE/%2Fcancel/signin', '', 'Cancel-application',
                //   'first', waitTimeout))
                // .then(() => signInPage.getEmailAddressInput())
                // .then((input) => input.sendKeys(USER_VERIFIED_PROFILE.email))
                // .then(() => signInPage.getPasswordInput())
                // .then((input) => input.sendKeys(USER_VERIFIED_PROFILE.password))
                // .then(() => {
                //     let button = signInPage.getSignInButton()
                //     browser.wait(ExpectedConditions.elementToBeClickable(button), waitTimeout,
                //         'Sign-in button it was not clickable')
                //     return button.click()
                // })
                .then(() => confirmPage('/project/LC/opp/LC1/LC-USER_VERIFIED_PROFILE/cancel', '', 'Cancel-application', 'first', waitTimeout))
                .then(done)
        })


        it('It should display the Karma Points that the user will lose', () => {
            testKarmaPoints(cancelApplicationPage, fullyLoaded['opp']['LC1'])
        })

        it('It should display the Community Benefit', () => {
            testCommunityBenefit(cancelApplicationPage, fullyLoaded)
        })

        it('It should display the benefit that the user will lose', () => {
            testBenefit(cancelApplicationPage, fullyLoaded)
        })

        it('Cancel button should return user to Opportunity page', () => {
            let cancelButton = cancelApplicationPage.getDismissCancelApplicationButton()
            browser.wait(ExpectedConditions.presenceOf(cancelButton), waitTimeout,
                'Cancel button on Application-Cancel page was not present')
            cancelButton.click();
            confirmPage('/project/LC/opp/LC1', '', 'Opportunity-LC1', 'first', waitTimeout)
            cancelButton = oppLCPage.getButton()
            browser.wait(ExpectedConditions.presenceOf(cancelButton), waitTimeout,
                'Cancel button from Opportunity-LC1 was not present')
            cancelButton.click()
                .then(() => confirmPage('/project/LC/opp/LC1/LC-USER_VERIFIED_PROFILE/cancel', '', 'Cancel-application', 'first', waitTimeout)
                )

        })

        it('Confirm button should take user to Cancel-application-confirmation page', () => {
            confirmPage('/project/LC/opp/LC1/LC-USER_VERIFIED_PROFILE/cancel', '', 'Cancel-application', 'first', waitTimeout)
            let confirmButton = cancelApplicationPage.getCancelApplicationButton()
            browser.wait(ExpectedConditions.presenceOf(confirmButton), waitTimeout,
                'Confirm cancel application button was no present')
            confirmButton.click().
                then(() => confirmPage('/project/LC/opp/LC1/cancel-confirmation', '', 'Confirm-Cancel-Application', 'first', waitTimeout)
                )
        })

    })


})