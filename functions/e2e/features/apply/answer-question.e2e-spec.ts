import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { ProjectSingleOppPage } from "../../po/project.single-opp.po";
import { AnswerQuestionPage } from "../../po/answer-question.po";
import { setUsersWithPartialProfile, setData, updateData, setUsers, signOut, signIn } from "../../firebase";
import { USER_VERIFIED_COMPLETE_PROFILE, USER_VERIFIED_LNAME_BDAY } from "../../fixtures/users-partial-profile";
import { CompleteProfilePage } from "../../po/complete.profile.po";
import { USER_NOT_VERIFIED } from "../../fixtures/users";

const waitTimeout = 5000

describe('Apply: user is asked a question before applying', () => {
    let answerQuestionPage: AnswerQuestionPage
    let KPCprojectPage: ProjectSingleOppPage
    let completeProfilePage: CompleteProfilePage
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const userProfiles = require('../../fixtures/user-profiles/partial-user-profiles.json')


    beforeAll(done => {
        answerQuestionPage = new AnswerQuestionPage()
        KPCprojectPage = new ProjectSingleOppPage()
        completeProfilePage = new CompleteProfilePage()

        browser.waitForAngularEnabled(false)
        setUsersWithPartialProfile()
            .then(() => setUsers)
            .then(() => setData('/', fullyLoaded))
            .then(() => { updateData('/profile', userProfiles) })
            .then(done)
    });

    describe('user verified with all profile information completed', () => {
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

    describe('Tests common for all type of users', () => {
        TestsCommonToAllTypeOfVerifiedUsers()
    })

    })

    describe('User verified that has not all profile information completed', () => {
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

        it('it should be taken to Complete profile page  ', function () {
            browser.wait(ExpectedConditions.urlContains('/apply/KPC1/complete-profile'),
                waitTimeout, 'User was not taken to Complete profile page')
            expect(true).toBeTruthy()

        });

        it('it should be taken to Answer Question after the rest of the information was completed  ', function () {
            let nameInput = completeProfilePage.getPreferredNameInput()
            browser.wait(ExpectedConditions.presenceOf(nameInput),
                waitTimeout, 'Preferred name input was not present')
            nameInput.sendKeys('Testie')
            completeProfilePage.getPhoneNumberInput().sendKeys('2334445555')
            let nextButton = completeProfilePage.getNextButton();
            browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                waitTimeout, 'Next button was not clickable when all information was completed')
            nextButton.click()
            browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'),
                waitTimeout, 'User was not taken to Answer Question page')
            expect(true).toBeTruthy()
        });

        describe('Tests common for all type of users', () => {
          TestsCommonToAllTypeOfVerifiedUsers()
        })

    })

    function TestsCommonToAllTypeOfVerifiedUsers() {

        it('it should display the question  ', function () {
            let question = answerQuestionPage.getQuestion()
            browser.wait(ExpectedConditions.presenceOf(question),
                waitTimeout, 'Next button name was not present')
            question.getText().then((str) => {
                browser.getCurrentUrl().then((url) => {
                    let oppKey: string = GetOppKey(url)
                    expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'])
                })
            })
        });

        it('next button is clickable only if the answer field is not empty ', function () {
            let nextButton = answerQuestionPage.getNextButton()
            browser.wait(ExpectedConditions.presenceOf(nextButton),
                waitTimeout, 'Next button name was not present')
            browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(nextButton)),
                waitTimeout, 'Next button was clickable when answer field was empty')
            answerQuestionPage.getAnswer().sendKeys('Answer is 42')
            browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                waitTimeout, 'Next button was not clickable when answer was written')
            expect(true).toBeTruthy()
        });
    }

    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 2];
    }

})