import 'jasmine'
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { ReviewApplicationDetailsPage } from '../../po/apply.review-application-details.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { joinATeam, GetNoAvailableTeamsForLCFromTestData } from './helper-functions'
import { DatePipe } from '@angular/common'
import { ReviewApplicationDetailsEditProfilePage } from '../../po/apply.review-application-details-edit-profile';
import { ReviewApplicationDetailsEditAnswerPage } from '../../po/apply.review-application-details-edit-answer.po';
import { ApplicationStages } from '../../fixtures/applications/application-stages';
import { LC_TO_MINDFUL_FEEDING } from '../../fixtures/applications/application-team';
import { LC_INCOMPLETE_APP } from '../../fixtures/applications/application';


const waitTimeout = 7000

describe('Apply-Review-Details: verified user with complete profile information', () => {

    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage
    let reviewApplicationDetailsPage: ReviewApplicationDetailsPage
    let reviewApplicationDetailsEditProfilePage: ReviewApplicationDetailsEditProfilePage
    let reviewApplicationDetailsEditAnswerPage: ReviewApplicationDetailsEditAnswerPage

    const organizerQuestionAnswer: string = 'Answer is always 42'
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
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/review-detail')),
                waitTimeout, 'User was not taken to Review-application-details Page').then(function () {
                    const previousButton = reviewApplicationDetailsPage.getPreviousButton()
                    browser.wait(ExpectedConditions.presenceOf(previousButton),
                        waitTimeout, 'Previous button from Review-application-details page was not present').then(function () {
                            previousButton.click().then(function () {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                                    ExpectedConditions.not(ExpectedConditions.urlContains('/teams/LC1')),
                                    ExpectedConditions.urlContains('/teams')),
                                    waitTimeout, 'User was not taken back to Pick-teams Page ' +
                                    'after pressing Previous button on Review-application-details page')

                                const selectedTeams = pickTeamPage.getSelectedTeams()
                                browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()),
                                    waitTimeout, 'There were no teams selected')
                                selectedTeams.count().then((teamsNo) => {
                                    expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
                                })

                                pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                                    expect(nrteams).toBe(GetNoAvailableTeamsForLCFromTestData(fullyLoaded['oppAllowedTeam']) - 1,
                                        'The number of available teams was not correct')
                                })
                                pickTeamPage.getNextButton().click().then(() => {
                                    browser.wait(ExpectedConditions.and(
                                        ExpectedConditions.urlContains('/apply/LC1/application/'),
                                        ExpectedConditions.urlContains('/review-detail')),
                                        waitTimeout, 'User was not taken back to Review-application-details Page')
                                })
                            })
                        })
                })
        })


        it('Next button should be clickable', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/review-detail')),
                waitTimeout, 'User was not taken to Review-application-details Page').then(function () {
                    browser.wait(ExpectedConditions.elementToBeClickable(reviewApplicationDetailsPage.getNextButton()),
                        waitTimeout, 'Next button was not clickable on Review-application-details page')

                })
        })
    })

    describe('Checking the section that contains data about the volunteer', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplicationTeams(LC_INCOMPLETE_APP, LC_TO_MINDFUL_FEEDING)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/review-detail'))
                .then(done)
        })
        it('It should display the profile information about the user', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/review-detail')),
                waitTimeout, 'User was not taken to Review-application-details Page').then(function () {
                    const userProfile = fullyLoaded['profile']['USER_VERIFIED_PROFILE']
                    const legalName = reviewApplicationDetailsPage.getLegalName()
                    browser.wait(ExpectedConditions.presenceOf(legalName),
                        waitTimeout, 'Legal name was not present').then(() => {

                            legalName.getText().then((legalName) => {
                                expect(legalName).toEqual(userProfile['legalName'], 'Legal name was not displayed correctly')
                            })
                            reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
                                expect(preferredName).toEqual(userProfile['preferredName'], 'Preferred name was not displayed correctly')
                            })
                            reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
                                expect(phoneNumber).toEqual(userProfile['phoneNumber'], 'Phone number was not displayed correctly')
                            })
                            const datePipe: DatePipe = new DatePipe('longDate');
                            reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
                                expect(birthday).toContain(datePipe.transform(userProfile['birthday'], 'longDate'), 'Birthday was not displayed correctly')
                            })

                        })
                })
        })

        it('It should allow user to edit his profile information', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/review-detail')),
                waitTimeout, 'User was not taken to Review-application-details Page').then(function () {
                    const newLegalName = 'Test edit'
                    const newPreferredName = 'Test edity'
                    const newPhoneNumber = '8053129900'
                    const newBirthday = '10-25-1973'
                    const editVolunteerLink = reviewApplicationDetailsPage.getVolunteerDetailsEditLink()
                    browser.wait(ExpectedConditions.presenceOf(editVolunteerLink),
                        waitTimeout, 'Edit volunteer details was not present').then(() => {
                            editVolunteerLink.click().then(() => {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                                    ExpectedConditions.urlContains('/edit-profile')),
                                    waitTimeout, 'User was not taken to Review-application-details-edit-profile Page').then(function () {
                                        let legalName = reviewApplicationDetailsEditProfilePage.getLegalName()
                                        browser.wait(ExpectedConditions.presenceOf(legalName), waitTimeout,
                                            'Legal name was not present')
                                        legalName.clear()
                                        legalName.sendKeys(newLegalName)

                                        const preferredName = reviewApplicationDetailsEditProfilePage.getPreferredName()
                                        browser.wait(ExpectedConditions.presenceOf(preferredName), waitTimeout,
                                            'Preferred name was not present')
                                        preferredName.clear()
                                        preferredName.sendKeys(newPreferredName)

                                        const phoneNumber = reviewApplicationDetailsEditProfilePage.getPhoneNumber()
                                        browser.wait(ExpectedConditions.presenceOf(phoneNumber), waitTimeout,
                                            'Phone number name was not present')
                                        phoneNumber.clear()
                                        phoneNumber.sendKeys(newPhoneNumber)

                                        const birthday = reviewApplicationDetailsEditProfilePage.getBirthday()
                                        browser.wait(ExpectedConditions.presenceOf(birthday), waitTimeout,
                                            'Birthday name was not present')
                                        birthday.sendKeys(newBirthday)

                                        reviewApplicationDetailsEditProfilePage.getSaveButton().click().then(() => {
                                            browser.wait(ExpectedConditions.and(
                                                ExpectedConditions.urlContains('/apply/LC1/application/'),
                                                ExpectedConditions.urlContains('/review-detail')),
                                                waitTimeout, 'User was not taken back to Review-application-details Page').then(() => {
                                                    legalName = reviewApplicationDetailsPage.getLegalName()
                                                    browser.wait(ExpectedConditions.presenceOf(legalName),
                                                        waitTimeout, 'Legal name was not present').then(() => {
                                                            legalName.getText().then((legalName) => {
                                                                expect(legalName).toEqual(newLegalName, 'Legal name was not edited correctly')
                                                            })
                                                            reviewApplicationDetailsPage.getPreferredName().getText().then((preferredName) => {
                                                                expect(preferredName).toEqual(newPreferredName, 'Preferred name was not edited correctly')
                                                            })
                                                            reviewApplicationDetailsPage.getPhoneNumber().getText().then((phoneNumber) => {
                                                                expect(phoneNumber).toEqual(newPhoneNumber, 'Phone number was not edited correctly')
                                                            })
                                                            const datePipe: DatePipe = new DatePipe('longDate');
                                                            reviewApplicationDetailsPage.getBirthday().getText().then((birthday) => {
                                                                expect(birthday).toContain(datePipe.transform(newBirthday, 'longDate'), 'Birthday was not edited correctly')
                                                            })

                                                        })
                                                })
                                        })
                                    })


                            })
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
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/review-detail')),
                waitTimeout, 'User was not taken to Review-application-details Page').then(function () {

                    const editOrganizerQuestion = reviewApplicationDetailsPage.getOrganizerQuestionEditLink()
                    browser.wait(ExpectedConditions.presenceOf(editOrganizerQuestion),
                        waitTimeout, 'Edit organizer question was not present').then(() => {
                            editOrganizerQuestion.click().then(() => {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                                    ExpectedConditions.urlContains('/edit-answer')),
                                    waitTimeout, 'User was not taken to Review-application-details-edit-answer Page').then(function () {
                                        const question = reviewApplicationDetailsEditAnswerPage.getQuestion()
                                        browser.wait(ExpectedConditions.presenceOf(question), waitTimeout,
                                            'The question was not present').then(() => {
                                                question.getText().then((question) => {
                                                    browser.getCurrentUrl().then((url) => {
                                                        const oppKey: string = GetOppKey(url)
                                                        expect(question).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                                            'The text of the question was not correct')
                                                    })
                                                })

                                                const answer = reviewApplicationDetailsEditAnswerPage.getAnswer()
                                                browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                                                    'Answer was not present')
                                                answer.clear()
                                                const newAnswer = 'Maybe 7 is the answer'
                                                answer.sendKeys(newAnswer)

                                                reviewApplicationDetailsEditProfilePage.getSaveButton().click().then(() => {
                                                    TestOrganizerQuestionInformation(newAnswer)
                                                })
                                            })
                                    })
                            })


                        })
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
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/review-detail')),
                waitTimeout, 'User was not taken to Review-application-details Page').then(function () {

                    const selectedTeams = reviewApplicationDetailsPage.getSelectedTeamsEditLink()
                    browser.wait(ExpectedConditions.presenceOf(selectedTeams),
                        waitTimeout, 'Edit teams was not present').then(() => {
                            selectedTeams.click().then(() => {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                                    ExpectedConditions.urlContains('/teams')),
                                    waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                                        joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage).then(() => {
                                            const next = pickTeamPage.getNextButton()
                                            browser.wait(ExpectedConditions.elementToBeClickable(next),
                                                waitTimeout, 'Next button from Pick-teams page was not clickable').then(() => {
                                                    next.click().then(() => {
                                                        TestSelectedTeams()
                                                    })
                                                })
                                        })

                                    })
                            })
                        })
                })
        })

    })





    // helper functions
    function GetOppKey(url: string) {
        const splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }
    function TestSelectedTeams() {
        browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains('/apply/LC1/application/'),
            ExpectedConditions.urlContains('/review-detail')),
            waitTimeout, 'User was not taken to Review-application-details Page').then(function () {
                const teamsExpandLink = reviewApplicationDetailsPage.getSelectedTeamsExapandLink()
                browser.wait(ExpectedConditions.presenceOf(teamsExpandLink),
                    waitTimeout, 'The the link to expand the question was not present').then(() => {
                        teamsExpandLink.click().then(() => {
                            const teams = reviewApplicationDetailsPage.getSelectedTeams()
                            browser.wait(ExpectedConditions.visibilityOf(teams.first()), waitTimeout,
                                'The teams did not become visible').then(() => {
                                    let teamIndex: number = 1;
                                    teams.each(function (item) {
                                        reviewApplicationDetailsPage.getSelectedTeamTitle(item).getText().then((title) => {
                                            expect(title).toMatch(fullyLoaded['team']['LC' + teamIndex.toString()]['title'])
                                        }).then(function () {
                                            teamIndex++;
                                        })
                                    })
                                })
                        })
                    })
            })
    }
    function TestOrganizerQuestionInformation(currentAnswer: string) {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains('/apply/LC1/application/'),
            ExpectedConditions.urlContains('/review-detail')),
            waitTimeout, 'User was not taken to Review-application-details Page').then(function () {
                const questionExpandLink = reviewApplicationDetailsPage.getOrganizerQuestionExapandLink()
                browser.wait(ExpectedConditions.presenceOf(questionExpandLink),
                    waitTimeout, 'The the link to expand the question was not present').then(() => {
                        questionExpandLink.click().then(() => {
                            const question = reviewApplicationDetailsPage.getOrganizerQuestion()
                            browser.wait(ExpectedConditions.visibilityOf(question), waitTimeout,
                                'The question did not become visible').then(() => {
                                    question.getText().then((str) => {
                                        browser.getCurrentUrl().then((url) => {
                                            const oppKey: string = GetOppKey(url)
                                            expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                                'The text of the question was not correct')
                                        })
                                    })
                                    reviewApplicationDetailsPage.getOrganizerQuestionAnswer().getText().then((answer) => {
                                        expect(answer).toEqual(currentAnswer)
                                    })
                                })
                        })
                    })
            })
    }

})
