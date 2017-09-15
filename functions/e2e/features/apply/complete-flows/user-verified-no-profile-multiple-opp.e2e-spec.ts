import 'jasmine'
import { ProjectMultiOppPage } from '../../../po/project.multi-opp.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut } from '../../../firebase';
import { USER_VERIFIED_NO_PROFILE } from '../../../fixtures/users';
import { joinATeam,confirmPage } from '../../helper-functions/shared';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { UserHomePage } from '../../../po/user-home.po';
import { CompleteProfilePage } from '../../../po/complete.profile.po';
import { OpportunityPage } from '../../../po/opp.partial-discount.po';
import { testsForReviewApplicationDetails } from '../../helper-functions/apply/review-details-common';
import { ReviewApplicationDetailsEditAnswerPage } from '../../../po/apply.review-application-details-edit-answer.po';
import { ReviewApplicationDetailsEditProfilePage } from '../../../po/apply.review-application-details-edit-profile';
import { testsReviewDetailsMultipleTeams } from '../../helper-functions/apply/review-details-multiple-teams';


fdescribe('Apply-Multiple-Opportunity-Flow: verified user with no profile information', () => {
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
    const answerOrganizerQuestion = 'I want to help'

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
            .then(() => signIn(USER_VERIFIED_NO_PROFILE.email, USER_VERIFIED_NO_PROFILE.password))
            .then(done)
    });



    it('It should be able to choose LC Event, complete all information about the profile'
        + ' answer organizer question, select a team, '
        + 'review the application details and submit ', function () {
            let LCProjectLink = homePage.getProjectLink(1)
            browser.wait(ExpectedConditions.presenceOf(LCProjectLink),
                waitTimeout, 'Link to LC project was not present')
            homePage.getProjectTitle(LCProjectLink).click()
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(LCprojectPage.getFirstOportunityTitleElement()),
                        waitTimeout, 'Link to the first opportunity of LC was not present')
                    return LCprojectPage.getFirstOportunityTitleElement().click()
                })
                .then(() => {
                    let join = oppLCPage.getJoinButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(join),
                        waitTimeout, 'Join opportunity button was not present')
                    return join.click()
                })
                .then(() => confirmPage('/apply/LC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout))
                .then(() => {
                    let userProfile = fullyLoaded['profile']['USER_VERIFIED_PROFILE']
                    let preferedName = completeProfilePage.getPreferredNameInput()
                    browser.wait(ExpectedConditions.presenceOf(preferedName),
                        waitTimeout, 'Preferred name was not present')
                    completeProfilePage.getPreferredNameInput().sendKeys(userProfile['preferredName'])
                    completeProfilePage.getPhoneNumberInput().sendKeys(userProfile['phoneNumber'])
                    completeProfilePage.getBirthdayInput().sendKeys('01091995')
                    completeProfilePage.getLegalNameInput().sendKeys(userProfile['legalName'])
                    let next = completeProfilePage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        waitTimeout, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/answer-question', '', 'Answer-question', 'first', waitTimeout))
                .then(() =>
                    confirmPage('/apply/LC1/application', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(answerOrganizerQuestionPage.getNextButton()),
                        waitTimeout, 'Next button was not present')
                    answerOrganizerQuestionPage.getAnswer().sendKeys(answerOrganizerQuestion)
                    let next = answerOrganizerQuestionPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        waitTimeout, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))

                .then(() => joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage))
                .then(() => {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        waitTimeout, 'Next button was not clickable when the team was selected')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout))
                .then(() => testsForReviewApplicationDetails(reviewApplicationDetailsPage,
                    new ReviewApplicationDetailsEditProfilePage(), 'LC1', pickTeamPage,
                    fullyLoaded, answerOrganizerQuestion, answerTeamQuestionPage, 'LC',
                    new ReviewApplicationDetailsEditAnswerPage()))
                .then(() => testsReviewDetailsMultipleTeams(pickTeamPage,
                    reviewApplicationDetailsPage, answerTeamQuestionPage, 'LC1', fullyLoaded, 'LC'))

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
