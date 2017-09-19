import 'jasmine'
import { ProjectSingleOppPage } from '../../../po/project.single-opp.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut } from '../../../firebase';
import { USER_VERIFIED_PROFILE } from '../../../fixtures/users';
import { confirmPage, joinATeam } from '../../helper-functions/shared';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { UserHomePage } from '../../../po/user-home.po';
import { testCommonProjectInformation } from '../../helper-functions/project/project-common';
import { testProjectSingleOpp } from '../../helper-functions/project/project-single-opp';
import { testsForAnswerOrganizerQuestionPage } from '../../helper-functions/apply/organizer-question';
import { testsForChooseTeamsPage } from '../../helper-functions/apply/choose-teams-common';
import { testsForChooseSingleTeamsPage } from '../../helper-functions/apply/choose-single-team';
import { testsForReviewApplicationDetails } from '../../helper-functions/apply/review-details-common';
import { ParamsObject } from '../../helper-functions/apply/params-object';

describe('Apply-Single-Opportunity-Flow: verified user with complete profile information', () => {
    let KPCprojectPage: ProjectSingleOppPage
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage
    let reviewApplicationDetailsPage: ReviewApplicationDetailsPage
    let homePage: UserHomePage
    let params: ParamsObject

    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
    const waitTimeout = 5000
    const answerOrganizerQuestion = 'I want to help'

    beforeAll(done => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        KPCprojectPage = new ProjectSingleOppPage();
        answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        reviewApplicationDetailsPage = new ReviewApplicationDetailsPage()
        homePage = new UserHomePage()
        params = new ParamsObject('KPC1', fullyLoaded, answerOrganizerQuestion, 'KPC', 'KPC1')

        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password))
            .then(done)
    });



    it('It should be able to choose KPC Event, answer organizer question, ' +
        'select a team, review the application details and submit ', function () {
            let KPCProjectLink = homePage.getProjectLink(0)
            browser.wait(ExpectedConditions.presenceOf(KPCProjectLink),
                waitTimeout, 'Link to KPC project was not present')
            homePage.getProjectTitle(KPCProjectLink).click()
                .then(() => testCommonProjectInformation(KPCprojectPage, fullyLoaded['project']['KPC']))
                .then(() => testProjectSingleOpp(KPCprojectPage, fullyLoaded, 'KPC1-1'))
                .then(() =>
                    browser.wait(ExpectedConditions.elementToBeClickable(KPCprojectPage.getJoinButton()),
                        waitTimeout, 'Join button was not present')
                )
                .then(() => KPCprojectPage.getJoinButton().click())
                .then(() =>
                    confirmPage('/apply/KPC1/answer-question', '', 'Answer-question', 'first', waitTimeout))
                .then(() => testsForAnswerOrganizerQuestionPage(answerOrganizerQuestionPage, fullyLoaded, 'KPC1'))
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(answerOrganizerQuestionPage.getNextButton()),
                        waitTimeout, 'Next button was not present')
                    answerOrganizerQuestionPage.getAnswer().sendKeys('42')
                    let next = answerOrganizerQuestionPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        waitTimeout, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/KPC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))
                .then(() => {
                    testsForChooseTeamsPage(params)
                    return testsForChooseSingleTeamsPage(params)
                })
                .then(() => joinATeam(pickTeamPage, waitTimeout, 'KPC1', answerTeamQuestionPage))
                .then(() => {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        waitTimeout, 'Next button was not clickable when the team was selected')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/KPC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout))
                .then(() => {
                    return testsForReviewApplicationDetails(params)
                })
                .then(() => {
                    let nextButton = reviewApplicationDetailsPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        waitTimeout, 'Next button was not clickable on Review-application-details page')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/KPC1/application/', '/apply-cofirmation', 'Apply-cofirmation', 'first', waitTimeout))
            expect(true).toBeTruthy()
        })


})
