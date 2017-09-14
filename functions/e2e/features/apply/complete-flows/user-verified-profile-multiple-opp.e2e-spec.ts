import 'jasmine'
import { ProjectMultiOppPage } from '../../../po/project.multi-opp.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut } from '../../../firebase';
import { USER_VERIFIED_PROFILE } from '../../../fixtures/users';
import { confirmPage } from '../../helper-functions/shared';
import { joinATeam } from '../../helper-functions/choose-teams/choose-teams-functions';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { UserHomePage } from '../../../po/user-home.po';
import { CompleteProfilePage } from '../../../po/complete.profile.po';
import { OpportunityPage } from '../../../po/opp.partial-discount.po';
import { testCommonProjectInformation } from "../../helper-functions/project/project-common";
import { testProjectMultipleOpp } from "../../helper-functions/project/project-multiple-opp";
import { testsForOpportunityPage } from "../../helper-functions/opportunity/opportunity";
import { testsForOnAnswerOrganizerQuestionPage } from "../../helper-functions/apply/organizer-question";
import { testsForChooseTeamsPage } from "../../helper-functions/apply/choose-teams-common";
import { testsForChooseMultipleTeamsPage } from "../../helper-functions/apply/choose-multiple-teams";

describe('Apply-Multiple-Opportunity-Flow: verified user with complete profile information', () => {
    let LCprojectPage: ProjectMultiOppPage
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage
    let reviewApplicationDetailsPage: ReviewApplicationDetailsPage
    let homePage: UserHomePage
    let completeProfilePage: CompleteProfilePage
    let oppLCPage: OpportunityPage

    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
    const waitTimeout = 5000

    beforeAll(done => {
        LCprojectPage = new ProjectMultiOppPage();
        answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        reviewApplicationDetailsPage = new ReviewApplicationDetailsPage()
        homePage = new UserHomePage()
        completeProfilePage = new CompleteProfilePage()
        oppLCPage = new OpportunityPage()
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
                waitTimeout, 'Link to LC project was not present')
            homePage.getProjectTitle(LCProjectLink).click()
                .then(() => testCommonProjectInformation(LCprojectPage, fullyLoaded['project']['LC']))
                .then(() => testProjectMultipleOpp(LCprojectPage, fullyLoaded))
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(LCprojectPage.getFirstOportunityTitleElement()),
                        waitTimeout, 'Link to the first opportunity of LC was not present')
                    return LCprojectPage.getFirstOportunityTitleElement().click()
                })
                .then(() => testsForOpportunityPage(oppLCPage, fullyLoaded, fullyLoaded['opp']['LC1']))
                .then(() => {
                    let join = oppLCPage.getJoinButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(join),
                        waitTimeout, 'Join opportunity button was not present')
                    return join.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/answer-question', '', 'Answer-question', 'first', waitTimeout))
                .then(() =>
                    confirmPage('/apply/LC1/application', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
                .then(() => testsForOnAnswerOrganizerQuestionPage(answerOrganizerQuestionPage, fullyLoaded))

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
                    confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))
                .then(() => testsForChooseTeamsPage(answerOrganizerQuestionPage, pickTeamPage,
                    fullyLoaded, 'LC1', answerTeamQuestionPage,'LC1'))
                .then(() => testsForChooseMultipleTeamsPage(pickTeamPage, fullyLoaded, 'LC1', answerTeamQuestionPage))
                .then(() => joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage))
                .then(() => {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        waitTimeout, 'Next button was not clickable when the team was selected')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout))
                .then(() => {
                    let nextButton = reviewApplicationDetailsPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        waitTimeout, 'Next button was not clickable on Review-application-details page')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/LC1/application/', '/apply-cofirmation', 'Apply-cofirmation', 'first', waitTimeout))
            expect(true).toBeTruthy()
        })


})
