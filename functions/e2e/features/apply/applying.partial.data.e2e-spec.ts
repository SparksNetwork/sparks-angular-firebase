import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { setData, setUsers, setUsersWithPartialProfile, signOut, signIn, updateData } from '../../firebase';
import { CompleteProfilePage } from "../../po/complete.profile.po";
import { USER_VERIFIED_LNAME, USER_VERIFIED_LNAME_BDAY, USER_VERIFIED_LNAME_BDAY_PNAME, USER_VERIFIED_COMPLETE_PROFILE } from "../../fixtures/users-partial-profile";
import { ProjectSingleOppPage } from "../../po/project.single-opp.po";
import { USER_NOT_VERIFIED } from "../../fixtures/users";

const waitTimeout = 5000

describe('Apply: user is asked only for the fields that were not previously written to database', () => {
    let page: CompleteProfilePage;
    let KPCprojectPage: ProjectSingleOppPage
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const userProfiles = require('../../fixtures/user-profiles/partial-user-profiles.json')

    beforeAll(done => {
        page = new CompleteProfilePage();
        KPCprojectPage = new ProjectSingleOppPage();
        browser.waitForAngularEnabled(false)
        setUsersWithPartialProfile()
            .then(() => setData('/', fullyLoaded))
            .then(() => { updateData('/profile', userProfiles) })
            .then(done)
    });

    describe('verified user with only legal name completed', () => {

        beforeAll(done => {
            browser.get('/')
                .then(signOut)
                .then(() => { signIn(USER_VERIFIED_LNAME.email, USER_VERIFIED_LNAME.password) })
                .then(() => { KPCprojectPage.navigateTo() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                        waitTimeout, "Join button was not present")
                })
                .then(() => { KPCprojectPage.getJoinButton().click() })
                .then(done)
        })

        it('it should not be asked to complete his legal name', function () {
            browser.wait(ExpectedConditions.invisibilityOf(page.getLegalNameInput()),
                waitTimeout, 'Input for legal name was visible')
            expect(true).toBeTruthy()
        });

        it('it should be asked to complete: prefered name, phone number and birthday', function () {
            browser.wait(ExpectedConditions.visibilityOf(page.getPreferredNameInput()),
                waitTimeout, 'Input for preferred name was not visible')
            browser.wait(ExpectedConditions.visibilityOf(page.getPhoneNumberInput()),
                waitTimeout, 'Input for phone number was not visible')
            browser.wait(ExpectedConditions.visibilityOf(page.getBirthdayInput()),
                waitTimeout, 'Input for birthday was not visible')
            expect(true).toBeTruthy()
        });

        it('user should be able to complete his profile and click Next', function () {
            let preferedName = page.getPreferredNameInput()
            browser.wait(ExpectedConditions.presenceOf(preferedName),
                waitTimeout, 'Preferred name was not present')
            page.getPreferredNameInput().sendKeys('Crinela')
            page.getPhoneNumberInput().sendKeys('8053129100')
            page.getBirthdayInput().sendKeys('10251974')
            browser.wait(ExpectedConditions.elementToBeClickable(page.getNextButton()),
                waitTimeout, 'Next button was not clickable')
            expect(true).toBeTruthy()
        })

    })

    describe('verified user with legal name and birthday completed', () => {

        beforeAll(done => {
            browser.get('/')
                .then(signOut)
                .then(() => { signIn(USER_VERIFIED_LNAME_BDAY.email, USER_VERIFIED_LNAME_BDAY.password) })
                .then(() => { KPCprojectPage.navigateTo() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                        waitTimeout, "Join button was not present")
                })
                .then(() => { KPCprojectPage.getJoinButton().click() })
                .then(done)
        })

        it('it should not be asked to complete his legal name and birthday', function () {
            browser.wait(ExpectedConditions.invisibilityOf(page.getLegalNameInput()),
                waitTimeout, 'Input for legal name was visible')
            browser.wait(ExpectedConditions.invisibilityOf(page.getBirthdayInput()),
                waitTimeout, 'Input for birthday was visible')
            expect(true).toBeTruthy()
        });

        it('it should be asked to complete: prefered name and phone number ', function () {
            browser.wait(ExpectedConditions.visibilityOf(page.getPreferredNameInput()),
                waitTimeout, 'Input for preferred name was not visible')
            browser.wait(ExpectedConditions.visibilityOf(page.getPhoneNumberInput()),
                waitTimeout, 'Input for phone number was not visible')
            expect(true).toBeTruthy()
        });

        it('user should be able to complete his profile and click Next', function () {
            let preferedName = page.getPreferredNameInput()
            browser.wait(ExpectedConditions.presenceOf(preferedName),
                waitTimeout, 'Preferred name was not present')
            page.getPreferredNameInput().sendKeys('Crinela')
            page.getPhoneNumberInput().sendKeys('8053129100')
            browser.wait(ExpectedConditions.elementToBeClickable(page.getNextButton()),
                10000, 'Next button was not clickable')
            expect(true).toBeTruthy()
        })
    })

    describe('verified user with legal name, birthday and preferred name completed', () => {

        beforeAll(done => {
            browser.get('/')
                .then(signOut)
                .then(() => { signIn(USER_VERIFIED_LNAME_BDAY_PNAME.email, USER_VERIFIED_LNAME_BDAY_PNAME.password) })
                .then(() => { KPCprojectPage.navigateTo() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                        waitTimeout, "Join button was not present")
                })
                .then(() => { KPCprojectPage.getJoinButton().click() })
                .then(done)
        })

        it('it should not be asked to complete his legal name, birthday and preferred name', function () {
            browser.wait(ExpectedConditions.invisibilityOf(page.getLegalNameInput()),
                waitTimeout, 'Input for legal name was visible')
            browser.wait(ExpectedConditions.invisibilityOf(page.getBirthdayInput()),
                waitTimeout, 'Input for birthday was visible')
            browser.wait(ExpectedConditions.invisibilityOf(page.getPreferredNameInput()),
                waitTimeout, 'Input for preferred name was visible')
            expect(true).toBeTruthy()
        });

        it('it should be asked to complete: phone number ', function () {
            browser.wait(ExpectedConditions.visibilityOf(page.getPhoneNumberInput()),
                waitTimeout, 'Input for phone number was not visible')
            expect(true).toBeTruthy()
        });

        it('user should be able to complete his profile and click Next', function () {
            let phoneNumber = page.getPhoneNumberInput()
            browser.wait(ExpectedConditions.presenceOf(phoneNumber),
                waitTimeout, 'Phone number name was not present')
            page.getPhoneNumberInput().sendKeys('8053129100')
            browser.wait(ExpectedConditions.elementToBeClickable(page.getNextButton()),
                10000, 'Next button was not clickable')
            expect(true).toBeTruthy()
        })

    })

    describe('verified user with complete information about the profile', () => {

        beforeAll(done => {
            browser.get('/')
                .then(signOut)
                .then(() => { signIn(USER_VERIFIED_COMPLETE_PROFILE.email, USER_VERIFIED_COMPLETE_PROFILE.password) })
                .then(() => { KPCprojectPage.navigateTo() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                        waitTimeout, "Join button was not present")
                })
                .then(() => { KPCprojectPage.getJoinButton().click() })
                .then(done)
        })

        it('it should be taken to Answer question page  ', function () {
            browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'),
                waitTimeout, 'User was not taken to Answer Question page')
            expect(true).toBeTruthy()
        });

    })
 
    describe('User not verified', () => {
        beforeAll(done => {
            browser.get('/')
                .then(signOut)
                .then(() => { signIn(USER_NOT_VERIFIED.email, USER_NOT_VERIFIED.password) })
                .then(() => { KPCprojectPage.navigateTo() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                        waitTimeout, "Join button was not present")
                })
                .then(() => { KPCprojectPage.getJoinButton().click() })
                .then(done)
        })

        it('it should be taken to Email not verified page ', function () {
            browser.wait(ExpectedConditions.urlContains('/auth/email-not-verified'),
                waitTimeout, 'User was not taken to Email not verified page')
            expect(true).toBeTruthy()

        });

    })



})
