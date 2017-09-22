import 'jasmine'
import { ProjectSingleOppPage } from '../../../po/project.single-opp.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut, setUsersWithPartialProfile, updateData } from '../../../firebase';
import { USER_VERIFIED_PROFILE } from '../../../fixtures/users';
import { confirmPage, joinATeam, WAIT_TIMEOUT } from '../../helper-functions/shared';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { UserHomePage } from '../../../po/user-home.po';
import { USER_VERIFIED_LNAME_BDAY } from '../../../fixtures/users-partial-profile';
import { CompleteProfilePage } from '../../../po/complete.profile.po';

describe('Apply-Single-Opportunity-Flow: verified user with legal name and birthday completed', () => {
    let KPCprojectPage: ProjectSingleOppPage
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage
    let reviewApplicationDetailsPage: ReviewApplicationDetailsPage
    let homePage: UserHomePage
    let completeProfilePage: CompleteProfilePage

    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
    const userProfiles = require('../../../fixtures/user-profiles/partial-user-profiles.json')

    beforeAll(done => {
        KPCprojectPage = new ProjectSingleOppPage();
        answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        reviewApplicationDetailsPage = new ReviewApplicationDetailsPage()
        homePage = new UserHomePage()
        completeProfilePage = new CompleteProfilePage()
        browser.waitForAngularEnabled(false)
        setUsersWithPartialProfile()
            .then(() => setData('/', fullyLoaded))
            .then(() => { updateData('/profile', userProfiles) })
            .then(() => browser.get('/'))
            .then(() => signOut())
            .then(() => signIn(USER_VERIFIED_LNAME_BDAY.email, USER_VERIFIED_LNAME_BDAY.password))
            .then(done)
    });



    it('It should be able to choose KPC Event, complete the missing information about the profile'
        + ' answer organizer question, select a team, '
        + 'review the application details and submit ', function () {
            let KPCProjectLink = homePage.getProjectLink(0)
            browser.wait(ExpectedConditions.presenceOf(KPCProjectLink),
                WAIT_TIMEOUT, 'Link to KPC project was not present')
            homePage.getProjectTitle(KPCProjectLink).click()
                .then(() =>
                    browser.wait(ExpectedConditions.elementToBeClickable(KPCprojectPage.getJoinButton()),
                        WAIT_TIMEOUT, 'Join button was not present'))
                .then(() => KPCprojectPage.getJoinButton().click())
                .then(() => confirmPage('/apply/KPC1/complete-profile', '', 'Complete-profile', 'first'))
                .then(() => {
                    let preferedName = completeProfilePage.getPreferredNameInput()
                    browser.wait(ExpectedConditions.presenceOf(preferedName),
                        WAIT_TIMEOUT, 'Preferred name was not present')
                    completeProfilePage.getPreferredNameInput().sendKeys('Crinela')
                    completeProfilePage.getPhoneNumberInput().sendKeys('8053129100')
                    let next = completeProfilePage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        WAIT_TIMEOUT, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/KPC1/answer-question', '', 'Answer-question', 'first'))
                .then(() => {
                    browser.wait(ExpectedConditions.presenceOf(answerOrganizerQuestionPage.getNextButton()),
                        WAIT_TIMEOUT, 'Next button was not present')
                    answerOrganizerQuestionPage.getAnswer().sendKeys('42')
                    let next = answerOrganizerQuestionPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        WAIT_TIMEOUT, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/KPC1/', '/teams', 'Pick-teams', 'first', '/teams/'))
                .then(() => joinATeam(pickTeamPage, 'KPC1', answerTeamQuestionPage))
                .then(() => {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        WAIT_TIMEOUT, 'Next button was not clickable when the team was selected')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/KPC1/', '/review-detail', 'Review-application-details', 'first'))
                .then(() => {
                    let nextButton = reviewApplicationDetailsPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        WAIT_TIMEOUT, 'Next button was not clickable on Review-application-details page')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/KPC1/', '/apply-cofirmation', 'Apply-cofirmation', 'first'))
            expect(true).toBeTruthy()
        })


})
