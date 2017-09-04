import 'jasmine'
import { ProjectMultiOppPage } from '../../po/project.multi-opp.po';
import { OpportunityPartialDiscountPage } from "../../po/opp.partial-discount.po";
import { AnswerQuestionPage } from "../../po/apply.answer-question.po";
import { PickTeamPage } from "../../po/apply.single.team.po";
import { AnswerTeamQuestion } from "../../po/apply.answer-team-question.po";
import { browser, ExpectedConditions } from "protractor/built";
import { setUsers, setData, signOut, signIn } from "../../firebase";
import { USER_VERIFIED_PROFILE } from "../../fixtures/users";


const waitTimeout = 7000
describe('Apply-Choosing-Teams: verified user with complete profile information', () => {
    let LCprojectPage: ProjectMultiOppPage
    let oppLCPage: OpportunityPartialDiscountPage
    let answerQuestionPage: AnswerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestion: AnswerTeamQuestion

    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
        LCprojectPage = new ProjectMultiOppPage()
        oppLCPage = new OpportunityPartialDiscountPage()
        answerQuestionPage = new AnswerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestion = new AnswerTeamQuestion()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(done)
    })

    describe('Checking Answer-team-question page', () => {
        beforeAll(done => {
            StepsToReachAnswerTeamQuestionPage(done)
        })

        it('it should display the question', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/teams/LC1')),
                waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {
                    let question = answerTeamQuestion.getQuestion()
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
            let joinButton= answerTeamQuestion.getJoinTeamButton()
            browser.wait(ExpectedConditions.presenceOf(joinButton),
                waitTimeout, 'Join button was not present')
            browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(joinButton)),
                waitTimeout, 'Join button was clickable when answer field was empty')
            answerQuestionPage.getAnswer().sendKeys('Answer is 42')
            browser.wait(ExpectedConditions.elementToBeClickable(joinButton),
                waitTimeout, 'Join button was not clickable when answer was written')
            expect(true).toBeTruthy()
        });

        //helper functions
        function GetTeamKey(url: string) {
            let splittedUrl = url.split('/');
            return splittedUrl[splittedUrl.length - 1];
        }
        function GetOppKey(url: string) {
            let splittedUrl = url.split('/');
            return splittedUrl[splittedUrl.length - 5];
        }

        function StepsToReachAnswerTeamQuestionPage(done) {
            browser.get('/')
                .then(function () {
                    setData('/', fullyLoaded)
                        .then(function () {
                            signOut()
                                .then(function () {
                                    signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password)
                                        .then(function () {
                                            LCprojectPage.navigateTo()
                                                .then(function () {
                                                    browser.wait(ExpectedConditions.presenceOf(LCprojectPage.getFirstOportunityTitleElement()),
                                                        waitTimeout, 'Link to the first opportunity of LC was not present')
                                                    LCprojectPage.getFirstOportunityTitleElement().click()
                                                        .then(function () {
                                                            browser.wait(ExpectedConditions.presenceOf(oppLCPage.getJoinButton()),
                                                                waitTimeout, 'Join opportunity button was not present')
                                                            oppLCPage.getJoinButton().click().then(function () {
                                                                browser.wait(ExpectedConditions.presenceOf(answerQuestionPage.getAnswer()), waitTimeout,
                                                                    'Answer to organizer question was not present')
                                                                answerQuestionPage.getAnswer().sendKeys('42')
                                                                let next = answerQuestionPage.getNextButton()
                                                                browser.wait(ExpectedConditions.elementToBeClickable(next),
                                                                    waitTimeout, 'Next button was not clickable').then(function () {
                                                                        next.click().then(function () {
                                                                            let team = pickTeamPage.getAvailableTeamLink(0)
                                                                            browser.wait(ExpectedConditions.presenceOf(team),
                                                                                waitTimeout, 'The first team was not present').then(function () {
                                                                                    pickTeamPage.getAvailableTeamTitle(team).click().then(done)
                                                                                })
                                                                        })
                                                                    })

                                                            })

                                                        })
                                                })
                                        })
                                })
                        })
                })


        }

    })
})