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

function testPreviousFunctionality(params) {

    confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)

    let previousButton = params.reviewApplicationDetailsPage.getPreviousButton()
    browser.wait(ExpectedConditions.presenceOf(previousButton),
        waitTimeout, 'On Review-application-details page Previous button from Review-application-details page was not present')
    previousButton.click()

    confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')

    let selectedTeams = params.pickTeamPage.getSelectedTeams()
    browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()),
        waitTimeout, 'On Choose-teams page there were no teams selected')
    selectedTeams.count().then((teamsNo) => {
        expect(teamsNo).toBe(1, 'On Choose-teams page the number of selected teams was not correct')
    })

    params.pickTeamPage.getAvailableTeams().count().then((nrteams) => {
        expect(nrteams).toBe(GetNoAvailableTeamsFromTestData(params.fullyLoaded['oppAllowedTeam'], params.oppKey) - 1,
            'On Choose-teams page the number of available teams was not correct')
    })
    return params.pickTeamPage.getNextButton().click()
        .then(() => confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'second', waitTimeout))

}

function testInformationAboutTheUser(params) {
    confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)

    let userProfile = params.fullyLoaded['profile']['USER_VERIFIED_PROFILE']
    let legalName = params.reviewApplicationDetailsPage.getLegalName()
    browser.wait(ExpectedConditions.presenceOf(legalName),
        waitTimeout, 'On Review-application-details page legal name was not present')

    legalName.getText().then((legalName) => {
        expect(legalName).toEqual(userProfile['legalName'],
            'On Review-application-details page legal name was not displayed correctly')
    })
    params.reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
        expect(preferredName).toEqual(userProfile['preferredName'],
            'On Review-application-details page preferred name was not displayed correctly')
    })
    params.reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
        expect(phoneNumber).toEqual(userProfile['phoneNumber'],
            'On Review-application-details page phone number was not displayed correctly')
    })
    let datePipe: DatePipe = new DatePipe('longDate');
    return params.reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
        expect(birthday).toContain(datePipe.transform(userProfile['birthday'], 'longDate'),
            'On Review-application-details page birthday was not displayed correctly')
    })


}

function testEditInformationAboutTheUser(params) {
    let newLegalName = 'Test edit'
    let newPreferredName = 'Test edity'
    let newPhoneNumber = '8053129900'
    let newBirthday = '10-25-1973'
    confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)

    let editVolunteerLink = params.reviewApplicationDetailsPage.getVolunteerDetailsEditLink()
    browser.wait(ExpectedConditions.presenceOf(editVolunteerLink),
        waitTimeout, 'On Review-application-details page edit volunteer details was not present')
    editVolunteerLink.click()


    confirmPage('/apply/' + params.oppKey + '/application/', '/edit-profile', 'Review-application-details-edit-profile', 'first', waitTimeout)

    let legalName = params.reviewApplicationDetailsEditProfilePage.getLegalName()
    browser.wait(ExpectedConditions.presenceOf(legalName), waitTimeout,
        'On Review-application-details-edit-profile  page legal name was not present')
    legalName.clear()
    legalName.sendKeys(newLegalName)

    let preferredName = params.reviewApplicationDetailsEditProfilePage.getPreferredName()
    browser.wait(ExpectedConditions.presenceOf(preferredName), waitTimeout,
        'On Review-application-details-edit-profile page preferred name was not present')
    preferredName.clear()
    preferredName.sendKeys(newPreferredName)

    let phoneNumber = params.reviewApplicationDetailsEditProfilePage.getPhoneNumber()
    browser.wait(ExpectedConditions.presenceOf(phoneNumber), waitTimeout,
        'On Review-application-details-edit-profile page Phone number name was not present')
    phoneNumber.clear()
    phoneNumber.sendKeys(newPhoneNumber)

    let birthday = params.reviewApplicationDetailsEditProfilePage.getBirthday()
    browser.wait(ExpectedConditions.presenceOf(birthday), waitTimeout,
        'On Review-application-details-edit-profile page Birthday name was not present')
    birthday.sendKeys(newBirthday)

    let saveButton = params.reviewApplicationDetailsEditProfilePage.getSaveButton();
    browser.wait(ExpectedConditions.elementToBeClickable(saveButton),
        waitTimeout, 'On Review-application-details-edit-profile page the Save button was not clickable')

    params.reviewApplicationDetailsEditProfilePage.getSaveButton().click()

    confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'second', waitTimeout)

    legalName = params.reviewApplicationDetailsPage.getLegalName()
    browser.wait(ExpectedConditions.presenceOf(legalName),
        waitTimeout, 'On Review-application-details page legal name was not present')
    legalName.getText().then((legalName) => {
        expect(legalName).toEqual(newLegalName,
            'On Review-application-details page legal name was not edited correctly')
    })
    params.reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
        expect(preferredName).toEqual(newPreferredName,
            'On Review-application-details page preferred name was not edited correctly')
    })
    params.reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
        expect(phoneNumber).toEqual(newPhoneNumber,
            'On Review-application-details page phone number was not edited correctly')
    })
    let datePipe: DatePipe = new DatePipe('longDate');
    return params.reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
        expect(birthday).toContain(datePipe.transform(newBirthday, 'longDate'),
            'On Review-application-details page birthday was not edited correctly')
    })


}

function testOrganizerQuestionSection(params, currentAnswer: string) {
 
    return confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(function () {
            let questionExpandLink = params.reviewApplicationDetailsPage.getOrganizerQuestionExapandLink()
            browser.wait(ExpectedConditions.presenceOf(questionExpandLink),
                waitTimeout, 'On Review-application-details page the link to expand the question was not present')
            return questionExpandLink.click()
        }).then(() => {
            let question = params.reviewApplicationDetailsPage.getOrganizerQuestion()
            browser.wait(ExpectedConditions.visibilityOf(question), waitTimeout,
                'On Review-application-details page the question did not become visible')
            question.getText().then((str) => {
                expect(str).toMatch(params.fullyLoaded['opp'][params.oppKey]['question'],
                    'On Review-application-details page the text of the question was not correct')

            })
            return params.reviewApplicationDetailsPage.getOrganizerQuestionAnswer().getText().then((answer) => {
                expect(answer).toEqual(currentAnswer,
                    'On Review-application-details page the answer to Organizer Question was not correct')
            })
        })
}


function testEditOrganizerQuestion(params) {

    let newAnswer = 'Maybe 7 is the answer'

    testOrganizerQuestionSection(params, params.organizerQuestionAnswer)
        .then(() => {
            let editOrganizerQuestion = params.reviewApplicationDetailsPage.getOrganizerQuestionEditLink()
            browser.wait(ExpectedConditions.presenceOf(editOrganizerQuestion),
                waitTimeout, 'On Review-application-details page edit organizer question was not present')
            return editOrganizerQuestion.click()
        })
        .then(() =>
            confirmPage('/apply/' + params.oppKey + '/application/', '/edit-answer', 'Review-application-details-edit-answer', 'first', waitTimeout))
        .then(() => {
            let question = params.reviewApplicationDetailsEditAnswerPage.getQuestion()
            browser.wait(ExpectedConditions.presenceOf(question), waitTimeout,
                'On Review-application-details page the question was not present')
            question.getText().then((question) => {
                expect(question).toMatch(params.fullyLoaded['opp'][params.oppKey]['question'],
                    'On Review-application-details page the text of the question was not correct')
            })

            let answer = params.reviewApplicationDetailsEditAnswerPage.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                'On Review-application-details page answer to Organizer Question was not present')
            answer.clear()
            answer.sendKeys(newAnswer)

            return params.reviewApplicationDetailsEditProfilePage.getSaveButton().click()
        })
        .then(() =>
            testOrganizerQuestionSection(params, newAnswer)
        )

}

export function testSelectedTeamsInformation(params) {

    return confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(() => {
            let teamsExpandLink = params.reviewApplicationDetailsPage.getSelectedTeamsExapandLink()
            browser.wait(ExpectedConditions.presenceOf(teamsExpandLink),
                waitTimeout, 'On Review-application-details page the the link to expand the selected teams was not present')
            return teamsExpandLink.click()
        }).then(() => {
            let teams = params.reviewApplicationDetailsPage.getSelectedTeams()
            browser.wait(ExpectedConditions.visibilityOf(teams.first()), waitTimeout,
                'On Review-application-details page the teams did not become visible')
            let teamIndex: number = 1;
            return teams.each(function (item) {
                params.reviewApplicationDetailsPage.getSelectedTeamTitle(item).getText().then((title) => {
                    expect(title).toMatch(params.fullyLoaded['team'][params.projectKey + teamIndex.toString()]['title'],
                        'On Review-application-details page the title of team ' + params.projectKey + teamIndex + ' was not correct')
                }).then(function () {
                    teamIndex++;
                })
            })

        })

}

export function testsForReviewApplicationDetails(params) {

    return testPreviousFunctionality(params)
        .then(() => testInformationAboutTheUser(params))
        .then(() => testEditInformationAboutTheUser(params))
        .then(() => testEditOrganizerQuestion(params))
        .then(() => testSelectedTeamsInformation(params))
}