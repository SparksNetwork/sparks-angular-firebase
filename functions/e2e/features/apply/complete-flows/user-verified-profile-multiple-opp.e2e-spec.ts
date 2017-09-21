import 'jasmine'
import { ProjectMultiOppPage } from '../../../po/project.multi-opp.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut } from '../../../firebase';
import { USER_VERIFIED_PROFILE } from '../../../fixtures/users';
import { confirmPage, joinATeam, WAIT_TIMEOUT } from '../../helper-functions/shared';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { UserHomePage } from '../../../po/user-home.po';
import { CompleteProfilePage } from '../../../po/complete.profile.po';
import { OpportunityPage } from '../../../po/opp.partial-discount.po';
import { testCommonProjectInformation } from '../../helper-functions/project/project-common';
import { testProjectMultipleOpp } from '../../helper-functions/project/project-multiple-opp';
import { testsForOpportunityPage } from '../../helper-functions/opportunity/opportunity';
import { testsForAnswerOrganizerQuestionPage } from '../../helper-functions/apply/organizer-question';
import { testsForChooseTeamsPage } from '../../helper-functions/apply/choose-teams-common';
import { testsForChooseMultipleTeamsPage } from '../../helper-functions/apply/choose-multiple-teams';
import { testsForReviewApplicationDetails } from '../../helper-functions/apply/review-details-common';
import { testsReviewDetailsMultipleTeams } from '../../helper-functions/apply/review-details-multiple-teams';
import { ParamsObject } from '../../helper-functions/apply/params-object';

describe('Apply-Multiple-Opportunity-Flow: verified user with complete profile information', () => {
    let LCprojectPage: ProjectMultiOppPage
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage
    let reviewApplicationDetailsPage: ReviewApplicationDetailsPage
    let homePage: UserHomePage
    let completeProfilePage: CompleteProfilePage
    let oppLCPage: OpportunityPage
    let params: ParamsObject;


    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
    const answerOrganizerQuestion = 'I want to help'

    beforeAll(done => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        LCprojectPage = new ProjectMultiOppPage();
        answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        reviewApplicationDetailsPage = new ReviewApplicationDetailsPage()
        homePage = new UserHomePage()
        completeProfilePage = new CompleteProfilePage()
        oppLCPage = new OpportunityPage()
        const answerOrganizerQuestion = 'I want to help'
        params = new ParamsObject('LC1', fullyLoaded, answerOrganizerQuestion, 'LC', 'LC1')

        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password))
            .then(done)
    });



    it('It should be able to choose LC Event, '
        + 'answer organizer question, select a team, '
        + 'review the application details and submit ', function () {
            let LCProjectLink = homePage.getProjectLink(1)
            browser.wait(ExpectedConditions.presenceOf(LCProjectLink),
                WAIT_TIMEOUT, 'Link to LC project was not present')
            homePage.getProjectTitle(LCProjectLink).click()
                .then(() => testCommonProjectInformation(LCprojectPage, fullyLoaded['project']['LC']))
                .then(() => testProjectMultipleOpp(LCprojectPage, fullyLoaded))
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(LCprojectPage.getFirstOportunityTitleElement()),
                        WAIT_TIMEOUT, 'Link to the first opportunity of LC was not present')
                    return LCprojectPage.getFirstOportunityTitleElement().click()
                })
                .then(() => testsForOpportunityPage(oppLCPage, fullyLoaded, fullyLoaded['opp']['LC1']))
                .then(() => {
                    let join = oppLCPage.getButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(join),
                        WAIT_TIMEOUT, 'Join opportunity button was not present')
                    return join.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/answer-question', '', 'Answer-question', 'first'))
                .then(() => testsForAnswerOrganizerQuestionPage(answerOrganizerQuestionPage, fullyLoaded, 'LC1'))

                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(answerOrganizerQuestionPage.getNextButton()),
                        WAIT_TIMEOUT, 'Next button was not present')
                    answerOrganizerQuestionPage.getAnswer().sendKeys(answerOrganizerQuestion)
                    let next = answerOrganizerQuestionPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        WAIT_TIMEOUT, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', '/teams/'))
                .then(() => {
                    testsForChooseTeamsPage(params)
                    return testsForChooseMultipleTeamsPage(params)
                })
                .then(() => joinATeam(pickTeamPage, 'LC1', answerTeamQuestionPage))
                .then(() => {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        WAIT_TIMEOUT, 'Next button was not clickable when the team was selected')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first'))
                .then(() => {
                    testsForReviewApplicationDetails(params)
                    return testsReviewDetailsMultipleTeams(params)
                })

                .then(() => {
                    let nextButton = reviewApplicationDetailsPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        WAIT_TIMEOUT, 'Next button was not clickable on Review-application-details page')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/LC1/application/', '/apply-cofirmation', 'Apply-cofirmation', 'first'))
            expect(true).toBeTruthy()
        })


})
