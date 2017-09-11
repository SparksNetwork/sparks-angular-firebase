import 'jasmine'
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { ReviewApplicationDetailsPage } from '../../po/apply.review-application-details.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { joinATeam, GetNoAvailableTeamsForLCFromTestData } from '../helper-functions/choose-teams/choose-teams-functions'
import { DatePipe } from '@angular/common'
import { ReviewApplicationDetailsEditProfilePage } from '../../po/apply.review-application-details-edit-profile';
import { ReviewApplicationDetailsEditAnswerPage } from '../../po/apply.review-application-details-edit-answer.po';
import { ApplicationStages } from '../../fixtures/applications/application-stages';
import { LC_TO_MINDFUL_FEEDING } from '../../fixtures/applications/application-team';
import { LC_INCOMPLETE_APP } from '../../fixtures/applications/application';
import { confirmPage } from '../helper-functions/navigation/navigation-functions';


const waitTimeout = 7000

describe('Apply-Review-Details: verified user with complete profile information', () => {

    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage
    let reviewApplicationDetailsPage: ReviewApplicationDetailsPage
    let reviewApplicationDetailsEditProfilePage: ReviewApplicationDetailsEditProfilePage
    let reviewApplicationDetailsEditAnswerPage: ReviewApplicationDetailsEditAnswerPage

    let organizerQuestionAnswer: string = 'Answer is always 42'
    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {

        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        reviewApplicationDetailsPage = new ReviewApplicationDetailsPage()
        reviewApplicationDetailsEditProfilePage = new ReviewApplicationDetailsEditProfilePage()
        reviewApplicationDetailsEditAnswerPage = new ReviewApplicationDetailsEditAnswerPage
        browser.waitForAngularEnabled(false).then(done)
    })

    describe('Checking Previous and Next buttons functionality', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplicationTeams(LC_INCOMPLETE_APP, LC_TO_MINDFUL_FEEDING)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/review-detail'))
                .then(done)
        })
        it('Previous button should take user to Pick-teams page and see the selected and available teams', function () {
            confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
                .then(() => {
                    let previousButton = reviewApplicationDetailsPage.getPreviousButton()
                    browser.wait(ExpectedConditions.presenceOf(previousButton),
                        waitTimeout, 'Previous button from Review-application-details page was not present')
                    return previousButton.click()
                })
                .then(() => {
                    confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')

                    let selectedTeams = pickTeamPage.getSelectedTeams()
                    browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()),
                        waitTimeout, 'There were no teams selected')
                    selectedTeams.count().then((teamsNo) => {
                        expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
                    })

                    pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                        expect(nrteams).toBe(GetNoAvailableTeamsForLCFromTestData(fullyLoaded['oppAllowedTeam']) - 1,
                            'The number of available teams was not correct')
                    })
                    return pickTeamPage.getNextButton().click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'second', waitTimeout))
        })

        it('Next button should be clickable', function () {
            confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
                .then(() =>
                    browser.wait(ExpectedConditions.elementToBeClickable(reviewApplicationDetailsPage.getNextButton()),
                        waitTimeout, 'Next button was not clickable on Review-application-details page'))
        })
    })

    describe('Checking the section that contains data about the volunteer', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplicationTeams(LC_INCOMPLETE_APP, LC_TO_MINDFUL_FEEDING)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/review-detail'))
                .then(done)
        })
        it('It should display the profile information about the user', function () {
            confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
                .then(() => {
                    let userProfile = fullyLoaded['profile']['USER_VERIFIED_PROFILE']
                    let legalName = reviewApplicationDetailsPage.getLegalName()
                    browser.wait(ExpectedConditions.presenceOf(legalName),
                        waitTimeout, 'Legal name was not present')

                    legalName.getText().then((legalName) => {
                        expect(legalName).toEqual(userProfile['legalName'], 'Legal name was not displayed correctly')
                    })
                    reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
                        expect(preferredName).toEqual(userProfile['preferredName'], 'Preferred name was not displayed correctly')
                    })
                    reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
                        expect(phoneNumber).toEqual(userProfile['phoneNumber'], 'Phone number was not displayed correctly')
                    })
                    let datePipe: DatePipe = new DatePipe('longDate');
                    return reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
                        expect(birthday).toContain(datePipe.transform(userProfile['birthday'], 'longDate'), 'Birthday was not displayed correctly')
                    })

                })
        })

        it('It should allow user to edit his profile information', function () {
            let newLegalName = 'Test edit'
            let newPreferredName = 'Test edity'
            let newPhoneNumber = '8053129900'
            let newBirthday = '10-25-1973'
            confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
                .then(function () {
                    let editVolunteerLink = reviewApplicationDetailsPage.getVolunteerDetailsEditLink()
                    browser.wait(ExpectedConditions.presenceOf(editVolunteerLink),
                        waitTimeout, 'Edit volunteer details was not present')
                    return editVolunteerLink.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/application/', '/edit-profile', 'Review-application-details-edit-profile', 'first', waitTimeout))
                .then(() => {
                    let legalName = reviewApplicationDetailsEditProfilePage.getLegalName()
                    browser.wait(ExpectedConditions.presenceOf(legalName), waitTimeout,
                        'Legal name was not present')
                    legalName.clear()
                    legalName.sendKeys(newLegalName)

                    let preferredName = reviewApplicationDetailsEditProfilePage.getPreferredName()
                    browser.wait(ExpectedConditions.presenceOf(preferredName), waitTimeout,
                        'Preferred name was not present')
                    preferredName.clear()
                    preferredName.sendKeys(newPreferredName)

                    let phoneNumber = reviewApplicationDetailsEditProfilePage.getPhoneNumber()
                    browser.wait(ExpectedConditions.presenceOf(phoneNumber), waitTimeout,
                        'Phone number name was not present')
                    phoneNumber.clear()
                    phoneNumber.sendKeys(newPhoneNumber)

                    let birthday = reviewApplicationDetailsEditProfilePage.getBirthday()
                    browser.wait(ExpectedConditions.presenceOf(birthday), waitTimeout,
                        'Birthday name was not present')
                    birthday.sendKeys(newBirthday)

                    reviewApplicationDetailsEditProfilePage.getSaveButton().click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'second', waitTimeout))
                .then(() => {
                    let legalName = reviewApplicationDetailsPage.getLegalName()
                    browser.wait(ExpectedConditions.presenceOf(legalName),
                        waitTimeout, 'Legal name was not present')
                    legalName.getText().then((legalName) => {
                        expect(legalName).toEqual(newLegalName, 'Legal name was not edited correctly')
                    })
                    reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
                        expect(preferredName).toEqual(newPreferredName, 'Preferred name was not edited correctly')
                    })
                    reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
                        expect(phoneNumber).toEqual(newPhoneNumber, 'Phone number was not edited correctly')
                    })
                    let datePipe: DatePipe = new DatePipe('longDate');
                    reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
                        expect(birthday).toContain(datePipe.transform(newBirthday, 'longDate'), 'Birthday was not edited correctly')
                    })

                })
        })
    })





    describe('Checking the section that contains the Organizer Question', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplicationTeams(LC_INCOMPLETE_APP, LC_TO_MINDFUL_FEEDING)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/review-detail'))
                .then(done)
        })

        it('It should display the question and the answer previously given by the user', function () {
            TestOrganizerQuestionInformation(organizerQuestionAnswer)
        })

        it('It should allow user to edit the answer to organizer question', function () {
            let newAnswer = 'Maybe 7 is the answer'
            confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
                .then(() => {
                    let editOrganizerQuestion = reviewApplicationDetailsPage.getOrganizerQuestionEditLink()
                    browser.wait(ExpectedConditions.presenceOf(editOrganizerQuestion),
                        waitTimeout, 'Edit organizer question was not present')
                    return editOrganizerQuestion.click()
                })
                .then(() =>
                    confirmPage('/apply/LC1/application/', '/edit-answer', 'Review-application-details-edit-answer', 'first', waitTimeout))
                .then(() => {
                    let question = reviewApplicationDetailsEditAnswerPage.getQuestion()
                    browser.wait(ExpectedConditions.presenceOf(question), waitTimeout,
                        'The question was not present')
                    question.getText().then((question) => {
                        browser.getCurrentUrl().then((url) => {
                            let oppKey: string = GetOppKey(url)
                            expect(question).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                'The text of the question was not correct')
                        })
                    })

                    let answer = reviewApplicationDetailsEditAnswerPage.getAnswer()
                    browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                        'Answer was not present')
                    answer.clear()
                    answer.sendKeys(newAnswer)

                    return reviewApplicationDetailsEditProfilePage.getSaveButton().click()
                })
                .then(() => {
                    TestOrganizerQuestionInformation(newAnswer)
                })
        })
    })




    describe('Checking the section that contains the Selected Teams', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplicationTeams(LC_INCOMPLETE_APP, LC_TO_MINDFUL_FEEDING)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/review-detail'))
                .then(done)
        })
        it('It should display the title of the team selected previously', function () {
            TestSelectedTeams()
        })

        it('It should allow user to edit the selected teams', function () {
            confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
                .then(() => {
                    let selectedTeams = reviewApplicationDetailsPage.getSelectedTeamsEditLink()
                    browser.wait(ExpectedConditions.presenceOf(selectedTeams),
                        waitTimeout, 'Edit teams was not present')
                    return selectedTeams.click()
                }).then(() =>
                    confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))
                .then(() =>
                    joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage))
                .then(() => {
                    let next = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(next),
                        waitTimeout, 'Next button from Pick-teams page was not clickable')
                    next.click()
                })
                .then(() => {
                    TestSelectedTeams()
                })
        })
    })

    //helper functions
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }
    function TestSelectedTeams() {
        confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
            .then(() => {
                let teamsExpandLink = reviewApplicationDetailsPage.getSelectedTeamsExapandLink()
                browser.wait(ExpectedConditions.presenceOf(teamsExpandLink),
                    waitTimeout, 'The the link to expand the selected teams was not present')
                return teamsExpandLink.click()
            }).then(() => {
                let teams = reviewApplicationDetailsPage.getSelectedTeams()
                browser.wait(ExpectedConditions.visibilityOf(teams.first()), waitTimeout,
                    'The teams did not become visible')
                let teamIndex: number = 1;
                teams.each(function (item) {
                    reviewApplicationDetailsPage.getSelectedTeamTitle(item).getText().then((title) => {
                        expect(title).toMatch(fullyLoaded['team']['LC' + teamIndex.toString()]['title'])
                    }).then(function () {
                        teamIndex++;
                    })
                })
                return null
            })

    }
    function TestOrganizerQuestionInformation(currentAnswer: string) {
        confirmPage('/apply/LC1/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
            .then(function () {
                let questionExpandLink = reviewApplicationDetailsPage.getOrganizerQuestionExapandLink()
                browser.wait(ExpectedConditions.presenceOf(questionExpandLink),
                    waitTimeout, 'The the link to expand the question was not present')
                return questionExpandLink.click()
            }).then(() => {
                let question = reviewApplicationDetailsPage.getOrganizerQuestion()
                browser.wait(ExpectedConditions.visibilityOf(question), waitTimeout,
                    'The question did not become visible')
                question.getText().then((str) => {
                    browser.getCurrentUrl().then((url) => {
                        let oppKey: string = GetOppKey(url)
                        expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                            'The text of the question was not correct')
                    })
                })
                return reviewApplicationDetailsPage.getOrganizerQuestionAnswer().getText().then((answer) => {
                    expect(answer).toEqual(currentAnswer)
                })
            })

    }


})