import 'jasmine'
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE, USER_VERIFIED_NO_PROFILE, USER_NOT_VERIFIED } from '../../fixtures/users';
import { LC_INCOMPLETE_APP, LC_INCOMPLETE_APP_USER_VER_NO_PROFILE, LC_INCOMPLETE_APP_USER_VER_ONLY_FNAME, LC_INCOMPLETE_APP_USER_NOT_VER } from "../../fixtures/applications/application";
import { ApplicationStages } from "../../fixtures/applications/application-stages";
import { USER_VERIFIED_LNAME } from "../../fixtures/users-partial-profile";
import { confirmPage } from "../helper-functions/navigation/navigation-functions";


const waitTimeout = 7000
describe('Apply-Choose-Teams: user must have complete and verified profile before join a team', () => {
    let answerTeamQuestionPage: AnswerTeamQuestionPage

    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        browser.waitForAngularEnabled(false).then(done)
    })
    describe('User with verified and complete profile', () => {

        describe('Checking Answer-team-question page', () => {
            beforeAll(done => {
                ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, LC_INCOMPLETE_APP)
                    .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/teams/LC1'))
                    .then(done)
            })


            it('it should display the question', function () {

                confirmPage('/apply/LC1/application/', '/teams/LC1', ' Answer-team-question', 'first', waitTimeout)
                    .then(() => {
                        let question = answerTeamQuestionPage.getQuestion()
                        browser.wait(ExpectedConditions.presenceOf(question),
                            waitTimeout, 'The text of the question was not present')
                        question.getText().then((str) => {
                            browser.getCurrentUrl().then((url) => {
                                let oppKey: string = GetOppKey(url)
                                let teamKey: string = GetTeamKey(url)

                                expect(str).toMatch(fullyLoaded['oppAllowedTeam'][oppKey + '-' + teamKey]['team']['question'],
                                    'The text of the question was not correct')
                            })
                        })
                    })
            })

            it('join button is clickable only if the answer field is not empty ', function () {
                let joinButton = answerTeamQuestionPage.getJoinTeamButton()
                browser.wait(ExpectedConditions.presenceOf(joinButton),
                    waitTimeout, 'Join button was not present')
                browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(joinButton)),
                    waitTimeout, 'Join button was clickable when answer field was empty')
                answerTeamQuestionPage.getAnswer().sendKeys('Answer is 42')
                browser.wait(ExpectedConditions.elementToBeClickable(joinButton),
                    waitTimeout, 'Join button was not clickable when answer was written')
                expect(true).toBeTruthy()
            });

        })



    })

    describe('User verified and no profile', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_NO_PROFILE, LC_INCOMPLETE_APP_USER_VER_NO_PROFILE)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_VER_NO_PROFILE/teams/LC1'))
                .then(done)
        })

        it('It should be redirected to Complete-profile page', function () {
            confirmPage('/apply/LC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout)
            expect(true).toBeTruthy()

        })

    })

    describe('User verified and only legal name completed', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_LNAME, LC_INCOMPLETE_APP_USER_VER_ONLY_FNAME)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_VER_ONLY_FNAM/teams/LC1'))
                .then(done)
        })

        it('It should be redirected to Complete-profile page', function () {
            confirmPage('/apply/LC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout)
            expect(true).toBeTruthy()

        })

    })


    describe('User not verified', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_NOT_VERIFIED, LC_INCOMPLETE_APP_USER_NOT_VER)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_NOT_VER/teams/LC1'))
                .then(done)
        })

        it('It should be redirected to Email-not-verified page', function () {
            confirmPage('/auth/email-not-verified', '', 'Email-not-verified', 'first', waitTimeout)
            expect(true).toBeTruthy()

        })

    })


    //helper functions
    function GetTeamKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 1];
    }
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 5];
    }

})