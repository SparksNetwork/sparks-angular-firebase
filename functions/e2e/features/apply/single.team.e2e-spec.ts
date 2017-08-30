import 'jasmine'
import { ProjectSingleOppPage } from "../../po/project.single-opp.po";
import { browser, ExpectedConditions } from "protractor/built";
import { setUsers, setData, signIn, signOut } from "../../firebase";
import { USER_VERIFIED_PROFILE } from "../../fixtures/users";
import { AnswerQuestionPage } from "../../po/apply.answer-question.po";
import { PickTeamPage } from "../../po/apply.single.team.po";

const waitTimeout = 5000

describe('Apply: verified user with complete profile information', () => {
    let KPCprojectPage: ProjectSingleOppPage
    let answerQuestionPage: AnswerQuestionPage
    let pickTeamPage: PickTeamPage
    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
        KPCprojectPage = new ProjectSingleOppPage();
        answerQuestionPage = new AnswerQuestionPage();
        pickTeamPage = new PickTeamPage()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(done)
    });

    describe('Only one team to join', () => {
        beforeAll(done => {
            browser.get('/')
                .then(signOut)
                .then(() => { signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password) })
                .then(() => { KPCprojectPage.navigateTo() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(KPCprojectPage.getJoinButton()),
                        waitTimeout, "Join button was not present")
                })
                .then(() => { KPCprojectPage.getJoinButton().click() })
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(answerQuestionPage.getNextButton()),
                        waitTimeout, "Next button was not present")
                    answerQuestionPage.getAnswer().sendKeys('42')
                })
                .then(() => { answerQuestionPage.getNextButton().click() })
                .then(done)
        })

        it('it should be taken to the page where he can pick teams ', function () {
            browser.wait(ExpectedConditions.urlContains('/teams'),
                waitTimeout, 'User was not taken to Pick a team page')
            expect(true).toBeTruthy()

        });

        it('it should display the available team ', function () {
            let team = pickTeamPage.getTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The available team was not present')
            expect(true).toBeTruthy()

        });

        it('user can join the available team ', function () {
            let team = pickTeamPage.getTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The available team was not present')
            pickTeamPage.getTeamTitle(team).click()

            expect(true).toBeTruthy()

        });

    })





})