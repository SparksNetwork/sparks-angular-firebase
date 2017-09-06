import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { ProjectSingleOppPage } from "../../po/project.single-opp.po";
import { AnswerQuestionPage } from "../../po/apply.answer-question.po";
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
        setUsersWithPartialProfile().then(() => {
            setUsers().then(() => {
                setData('/', fullyLoaded).then(() => {
                    updateData('/profile', userProfiles)
                }).then(done)
            })
        })

    });

    describe('user verified with all profile information completed', () => {
        beforeAll(done => {
            browser.get('/')
                .then(function () {
                    signOut().then(function () {
                        signIn(USER_VERIFIED_COMPLETE_PROFILE.email, USER_VERIFIED_COMPLETE_PROFILE.password).then(function () {
                            KPCprojectPage.navigateTo().then(function () {
                                browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                                    waitTimeout, "Join button was not present").then(function () {
                                        KPCprojectPage.getJoinButton().click().then(done)
                                    })
                            })
                        })
                    })

                })
        })

        it('it should be taken to Answer-question page and then redirected in the application flow ', function () {
            browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'),
                waitTimeout, 'User was not taken to Answer-question page').then(function () {
                    browser.wait(ExpectedConditions.and(
                        ExpectedConditions.urlContains('/apply/KPC1/application'),
                        ExpectedConditions.urlContains('/answer-question')),
                        waitTimeout, 'User was not redirected to Answer-organizer-question from the application flow page')
                })
            expect(true).toBeTruthy()

        });

        describe('Tests common for all type of users', () => {
            TestsCommonToAllTypeOfVerifiedUsers()
        })

    })

    describe('User verified that has not all profile information completed', () => {
        beforeAll(done => {
            browser.get('/')
                .then(function () {
                    signOut().then(function () {
                        signIn(USER_VERIFIED_LNAME_BDAY.email, USER_VERIFIED_LNAME_BDAY.password).then(function () {
                            KPCprojectPage.navigateTo().then(function () {
                                browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                                    waitTimeout, "Join button was not present").then(function () {
                                        KPCprojectPage.getJoinButton().click().then(done)
                                    })
                            })
                        })

                    })
                })
        })


        it('it should be taken to Complete profile page  ', function () {
            browser.wait(ExpectedConditions.urlContains('/apply/KPC1/complete-profile'),
                waitTimeout, 'User was not taken to Complete-profile page')
            expect(true).toBeTruthy()

        });

        it('it should be taken to Answer Question after the rest of the information was completed  ', function () {
            let nameInput = completeProfilePage.getPreferredNameInput()
            browser.wait(ExpectedConditions.presenceOf(nameInput),
                waitTimeout, 'Preferred name input was not present')
            nameInput.sendKeys('Testie')
            completeProfilePage.getPhoneNumberInput().sendKeys('8053129100')
            let nextButton = completeProfilePage.getNextButton();
            browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                waitTimeout, 'Next button was not clickable when all information was completed').then(function () {
                    nextButton.click()
                    browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'),
                        waitTimeout, 'User was not taken to Answer-organizer-question page')
                    expect(true).toBeTruthy()
                })

        });

        describe('Tests common for all type of users', () => {
            TestsCommonToAllTypeOfVerifiedUsers()
        })

    })

    function TestsCommonToAllTypeOfVerifiedUsers() {

        it('it should display the question  ', function () {

            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application'),
                ExpectedConditions.urlContains('/answer-question')),
                waitTimeout, 'User was not redirected to Answer-organizer-question from the application flow page')
                .then(function () {
                    let question = answerQuestionPage.getQuestion()
                    browser.wait(ExpectedConditions.presenceOf(question),
                        waitTimeout, 'The text of the question was not present')
                    question.getText().then((str) => {
                        browser.getCurrentUrl().then((url) => {
                            let oppKey: string = GetOppKey(url)
                            expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                'The text of the question was not correct')
                        })
                    })
                })
        });

        it('next button is clickable only if the answer field is not empty ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application'),
                ExpectedConditions.urlContains('/answer-question')),
                waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {
                    let nextButton = answerQuestionPage.getNextButton()
                    browser.wait(ExpectedConditions.presenceOf(nextButton),
                        waitTimeout, 'Next button name was not present').then(function () {
                            browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(nextButton)),
                                waitTimeout, 'Next button was clickable when answer field was empty')
                            answerQuestionPage.getAnswer().sendKeys('Answer is 42')
                            browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                                waitTimeout, 'Next button was not clickable when answer was written')
                            expect(true).toBeTruthy()
                        })
                })
        })
    }

    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }
})