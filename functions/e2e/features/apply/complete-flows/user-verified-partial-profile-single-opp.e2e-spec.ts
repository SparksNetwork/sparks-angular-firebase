import 'jasmine'
import { ProjectSingleOppPage } from '../../../po/project.single-opp.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut, setUsersWithPartialProfile, updateData } from '../../../firebase';
import { USER_VERIFIED_PROFILE } from '../../../fixtures/users';
import { confirmPage } from '../../helper-functions/navigation/navigation-functions';
import { joinATeam } from '../../helper-functions/choose-teams/choose-teams-functions';
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
    const waitTimeout = 5000

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
                waitTimeout, 'Link to KPC project was not present')
            homePage.getProjectTitle(KPCProjectLink).click()
                .then(() =>
                    browser.wait(ExpectedConditions.elementToBeClickable(KPCprojectPage.getJoinButton()),
                        waitTimeout, 'Join button was not present'))
                .then(() => KPCprojectPage.getJoinButton().click())
                .then(() => confirmPage('/apply/KPC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout))
                .then(() => {
                    let preferedName = completeProfilePage.getPreferredNameInput()
                    browser.wait(ExpectedConditions.presenceOf(preferedName),
                        waitTimeout, 'Preferred name was not present')
                    completeProfilePage.getPreferredNameInput().sendKeys('Crinela')
                    completeProfilePage.getPhoneNumberInput().sendKeys('8053129100')
                    let next = completeProfilePage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        waitTimeout, 'Next button was not clickable')
                    return next.click()
                })
                .then(() =>
                    confirmPage('/apply/KPC1/answer-question', '', 'Answer-question', 'first', waitTimeout))
                .then(() =>
                    confirmPage('/apply/KPC1/application', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
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
                .then(() => joinATeam(pickTeamPage, waitTimeout, 'KPC1', answerTeamQuestionPage))
                .then(() => {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                        waitTimeout, 'Next button was not clickable when the team was selected')
                    return nextButton.click()
                })
                .then(() => confirmPage('/apply/KPC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout))
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
