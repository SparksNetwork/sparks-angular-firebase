import 'jasmine'
import { confirmPage, GetKeyFromUrl } from '../shared';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { GetNoAvailableTeamsFromTestData, joinATeam } from '../../helper-functions/shared';
import { DatePipe } from '@angular/common';
import { ReviewApplicationDetailsEditProfilePage } from '../../../po/apply.review-application-details-edit-profile';
import { ReviewApplicationDetailsEditAnswerPage } from '../../../po/apply.review-application-details-edit-answer.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';

const waitTimeout = 5000

function testPreviousFunctionality(pickTeamPage: PickTeamPage, oppKey: string,
    reviewApplicationDetailsPage: ReviewApplicationDetailsPage, fullyLoaded: any) {

    confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)

    let previousButton = reviewApplicationDetailsPage.getPreviousButton()
    browser.wait(ExpectedConditions.presenceOf(previousButton),
        waitTimeout, 'On Review-application-details page Previous button from Review-application-details page was not present')
    previousButton.click()

    confirmPage('/apply/' + oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')

    let selectedTeams = pickTeamPage.getSelectedTeams()
    browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()),
        waitTimeout, 'On Choose-teams page there were no teams selected')
    selectedTeams.count().then((teamsNo) => {
        expect(teamsNo).toBe(1, 'On Choose-teams page the number of selected teams was not correct')
    })

    pickTeamPage.getAvailableTeams().count().then((nrteams) => {
        expect(nrteams).toBe(GetNoAvailableTeamsFromTestData(fullyLoaded['oppAllowedTeam'], oppKey) - 1,
            'On Choose-teams page the number of available teams was not correct')
    })
    return pickTeamPage.getNextButton().click()
        .then(() => confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'second', waitTimeout))

}

function testInformationAboutTheUser(reviewApplicationDetailsPage: ReviewApplicationDetailsPage, fullyLoaded: any,
    oppKey: string) {
    confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)

    let userProfile = fullyLoaded['profile']['USER_VERIFIED_PROFILE']
    let legalName = reviewApplicationDetailsPage.getLegalName()
    browser.wait(ExpectedConditions.presenceOf(legalName),
        waitTimeout, 'On Review-application-details page legal name was not present')

    legalName.getText().then((legalName) => {
        expect(legalName).toEqual(userProfile['legalName'],
            'On Review-application-details page legal name was not displayed correctly')
    })
    reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
        expect(preferredName).toEqual(userProfile['preferredName'],
            'On Review-application-details page preferred name was not displayed correctly')
    })
    reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
        expect(phoneNumber).toEqual(userProfile['phoneNumber'],
            'On Review-application-details page phone number was not displayed correctly')
    })
    let datePipe: DatePipe = new DatePipe('longDate');
    return reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
        expect(birthday).toContain(datePipe.transform(userProfile['birthday'], 'longDate'),
            'On Review-application-details page birthday was not displayed correctly')
    })


}

function testEditInformationAboutTheUser(reviewApplicationDetailsPage: ReviewApplicationDetailsPage,
    reviewApplicationDetailsEditProfilePage: ReviewApplicationDetailsEditProfilePage, oppKey: string) {
    let newLegalName = 'Test edit'
    let newPreferredName = 'Test edity'
    let newPhoneNumber = '8053129900'
    let newBirthday = '10-25-1973'
    confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)

    let editVolunteerLink = reviewApplicationDetailsPage.getVolunteerDetailsEditLink()
    browser.wait(ExpectedConditions.presenceOf(editVolunteerLink),
        waitTimeout, 'On Review-application-details page edit volunteer details was not present')
    editVolunteerLink.click()


    confirmPage('/apply/' + oppKey + '/application/', '/edit-profile', 'Review-application-details-edit-profile', 'first', waitTimeout)

    let legalName = reviewApplicationDetailsEditProfilePage.getLegalName()
    browser.wait(ExpectedConditions.presenceOf(legalName), waitTimeout,
        'On Review-application-details-edit-profile  page legal name was not present')
    legalName.clear()
    legalName.sendKeys(newLegalName)

    let preferredName = reviewApplicationDetailsEditProfilePage.getPreferredName()
    browser.wait(ExpectedConditions.presenceOf(preferredName), waitTimeout,
        'On Review-application-details-edit-profile page preferred name was not present')
    preferredName.clear()
    preferredName.sendKeys(newPreferredName)

    let phoneNumber = reviewApplicationDetailsEditProfilePage.getPhoneNumber()
    browser.wait(ExpectedConditions.presenceOf(phoneNumber), waitTimeout,
        'On Review-application-details-edit-profile page Phone number name was not present')
    phoneNumber.clear()
    phoneNumber.sendKeys(newPhoneNumber)

    let birthday = reviewApplicationDetailsEditProfilePage.getBirthday()
    browser.wait(ExpectedConditions.presenceOf(birthday), waitTimeout,
        'On Review-application-details-edit-profile page Birthday name was not present')
    birthday.sendKeys(newBirthday)

    let saveButton = reviewApplicationDetailsEditProfilePage.getSaveButton();
    browser.wait(ExpectedConditions.elementToBeClickable(saveButton),
        waitTimeout, 'On Review-application-details-edit-profile page the Save button was not clickable')

    reviewApplicationDetailsEditProfilePage.getSaveButton().click()

    confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'second', waitTimeout)

    legalName = reviewApplicationDetailsPage.getLegalName()
    browser.wait(ExpectedConditions.presenceOf(legalName),
        waitTimeout, 'On Review-application-details page legal name was not present')
    legalName.getText().then((legalName) => {
        expect(legalName).toEqual(newLegalName,
            'On Review-application-details page legal name was not edited correctly')
    })
    reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
        expect(preferredName).toEqual(newPreferredName,
            'On Review-application-details page preferred name was not edited correctly')
    })
    reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
        expect(phoneNumber).toEqual(newPhoneNumber,
            'On Review-application-details page phone number was not edited correctly')
    })
    let datePipe: DatePipe = new DatePipe('longDate');
    return reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
        expect(birthday).toContain(datePipe.transform(newBirthday, 'longDate'),
            'On Review-application-details page birthday was not edited correctly')
    })


}

function testOrganizerQuestionSection(reviewApplicationDetailsPage: ReviewApplicationDetailsPage,
    fullyLoaded: any, oppKey: string, currentAnswer: string) {
    confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(function () {
            let questionExpandLink = reviewApplicationDetailsPage.getOrganizerQuestionExapandLink()
            browser.wait(ExpectedConditions.presenceOf(questionExpandLink),
                waitTimeout, 'On Review-application-details page the link to expand the question was not present')
            return questionExpandLink.click()
        }).then(() => {
            let question = reviewApplicationDetailsPage.getOrganizerQuestion()
            browser.wait(ExpectedConditions.visibilityOf(question), waitTimeout,
                'On Review-application-details page the question did not become visible')
            question.getText().then((str) => {
                browser.getCurrentUrl().then((url) => {
                    let oppKey: string = GetKeyFromUrl(url, 4)
                    expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                        'On Review-application-details page the text of the question was not correct')
                })
            })
            return reviewApplicationDetailsPage.getOrganizerQuestionAnswer().getText().then((answer) => {
                expect(answer).toEqual(currentAnswer,
                    'On Review-application-details page the answer to Organizer Question was not correct')
            })
        })
}


function testEditOrganizerQuestion(reviewApplicationDetailsPage: ReviewApplicationDetailsPage,
    reviewApplicationDetailsEditAnswerPage: ReviewApplicationDetailsEditAnswerPage,
    fullyLoaded: any, reviewApplicationDetailsEditProfilePage: ReviewApplicationDetailsEditProfilePage,
    oppKey: string) {

    let newAnswer = 'Maybe 7 is the answer'
    return confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(() => {
            let editOrganizerQuestion = reviewApplicationDetailsPage.getOrganizerQuestionEditLink()
            browser.wait(ExpectedConditions.presenceOf(editOrganizerQuestion),
                waitTimeout, 'On Review-application-details page edit organizer question was not present')
            return editOrganizerQuestion.click()
        })
        .then(() =>
            confirmPage('/apply/' + oppKey + '/application/', '/edit-answer', 'Review-application-details-edit-answer', 'first', waitTimeout))
        .then(() => {
            let question = reviewApplicationDetailsEditAnswerPage.getQuestion()
            browser.wait(ExpectedConditions.presenceOf(question), waitTimeout,
                'On Review-application-details page the question was not present')
            question.getText().then((question) => {
                browser.getCurrentUrl().then((url) => {
                    let oppKey: string = GetKeyFromUrl(url, 4)
                    expect(question).toMatch(fullyLoaded['opp'][oppKey]['question'],
                        'On Review-application-details page the text of the question was not correct')
                })
            })

            let answer = reviewApplicationDetailsEditAnswerPage.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                'On Review-application-details page answer to Organizer Question was not present')
            answer.clear()
            answer.sendKeys(newAnswer)

            return reviewApplicationDetailsEditProfilePage.getSaveButton().click()
        })
        .then(() =>
            testOrganizerQuestionSection(reviewApplicationDetailsPage,
                fullyLoaded, oppKey, newAnswer)
        )

}

export function testSelectedTeamsInformation(oppKey: string, fullyLoaded: any,
    reviewApplicationDetailsPage: ReviewApplicationDetailsPage, projectKey: string) {
    return confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(() => {
            let teamsExpandLink = reviewApplicationDetailsPage.getSelectedTeamsExapandLink()
            browser.wait(ExpectedConditions.presenceOf(teamsExpandLink),
                waitTimeout, 'On Review-application-details page the the link to expand the selected teams was not present')
            return teamsExpandLink.click()
        }).then(() => {
            let teams = reviewApplicationDetailsPage.getSelectedTeams()
            browser.wait(ExpectedConditions.visibilityOf(teams.first()), waitTimeout,
                'On Review-application-details page the teams did not become visible')
            let teamIndex: number = 1;
            return teams.each(function (item) {
                reviewApplicationDetailsPage.getSelectedTeamTitle(item).getText().then((title) => {
                    expect(title).toMatch(fullyLoaded['team'][projectKey + teamIndex.toString()]['title'],
                        'On Review-application-details page the title of team ' + projectKey + teamIndex + ' was not correct')
                }).then(function () {
                    teamIndex++;
                })
            })

        })

}

export function testsForReviewApplicationDetails(reviewApplicationDetailsPage: ReviewApplicationDetailsPage,
    reviewApplicationDetailsEditProfilePage: ReviewApplicationDetailsEditProfilePage,
    oppKey: string, pickTeamPage: PickTeamPage, fullyloaded: any, organizerQuestionAnswer: string,
    answerTeamQuestionPage: AnswerTeamQuestionPage, projectKey: string,
    reviewApplicationDetailsEditAnswerPage: ReviewApplicationDetailsEditAnswerPage
) {

    return testPreviousFunctionality(pickTeamPage, oppKey, reviewApplicationDetailsPage, fullyloaded)
        .then(() => testInformationAboutTheUser(reviewApplicationDetailsPage, fullyloaded, oppKey))
        .then(() => testEditInformationAboutTheUser(reviewApplicationDetailsPage,
            reviewApplicationDetailsEditProfilePage, oppKey))
        .then(() => testOrganizerQuestionSection(reviewApplicationDetailsPage,
            fullyloaded, oppKey, organizerQuestionAnswer))
        .then(() => testEditOrganizerQuestion(reviewApplicationDetailsPage,
            reviewApplicationDetailsEditAnswerPage, fullyloaded,
            reviewApplicationDetailsEditProfilePage, oppKey))
        .then(() => testSelectedTeamsInformation(oppKey, fullyloaded,
            reviewApplicationDetailsPage, projectKey))
}