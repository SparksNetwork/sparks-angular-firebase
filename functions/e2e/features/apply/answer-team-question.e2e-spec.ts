import 'jasmine'
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { LC_INCOMPLETE_APP } from "../../fixtures/applications/application";
import { ApplicationStages } from "../../fixtures/applications/application-stages";


const waitTimeout = 7000
describe('Apply-Choosing-Teams: verified user with complete profile information', () => {
    let answerTeamQuestionPage: AnswerTeamQuestionPage

    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        browser.waitForAngularEnabled(false).then(done)
    })

    describe('Checking Answer-team-question page', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, LC_INCOMPLETE_APP)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/teams/LC1'))
                .then(done)
        })


        it('it should display the question', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/teams/LC1')),
                waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {
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