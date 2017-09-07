import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { AnswerOrganizerQuestionPage } from "../../po/apply.answer-organizer-question.po";
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { joinATeam, TestsForSelectedAndAvailableTeams } from './helper-functions'
import { KPC_INCOMPLETE_APP } from "../../fixtures/applications/application";
import { ApplicationStages } from "../../fixtures/applications/application-stages";

const waitTimeout = 7000

describe('Apply-Single-Team: verified user with complete profile information', () => {
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage

    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
     
        answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        browser.waitForAngularEnabled(false).then(done)
    })

    describe('Checking Previous and Next functionality', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, KPC_INCOMPLETE_APP)
                .then(() => browser.get('/apply/KPC1/application/KPC_INCOMPLETE_APP/teams'))
                .then(done)
        })

        it('Previous button should take user back to Organizer Question', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let previousButton = pickTeamPage.getPreviousButton()
                    browser.wait(ExpectedConditions.presenceOf(previousButton),
                        waitTimeout, 'Previous button was not present').then(function () {
                            previousButton.click().then(function () {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                    ExpectedConditions.urlContains('/answer-question')),
                                    waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {
                                        let question = answerOrganizerQuestionPage.getQuestion()
                                        browser.wait(ExpectedConditions.presenceOf(question),
                                            waitTimeout, 'The text of the question was not present').then(function () {
                                                question.getText().then((str) => {
                                                    browser.getCurrentUrl().then((url) => {
                                                        let oppKey: string = GetOppKey(url)
                                                        expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                                            'The text of the question was not correct')
                                                        let nextButton = answerOrganizerQuestionPage.getNextButton().click().then(function () {
                                                            browser.wait(ExpectedConditions.and(
                                                                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                                ExpectedConditions.urlContains('/teams')),
                                                                waitTimeout, 'User was not taken back to Pick-a-team Page')
                                                        })

                                                    })
                                                })

                                            })

                                    })


                            })

                        })
                })


        })

        it('Previous button should allow user to edit his answer ' +
            'to Organizer Question', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                        //press previous from Pick-a-team-page
                        let previousButton = pickTeamPage.getPreviousButton()
                        browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                            waitTimeout, 'Previous button was not present').then(function () {
                                previousButton.click().then(function () {
                                    browser.wait(ExpectedConditions.and(
                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                        ExpectedConditions.urlContains('/answer-question')),
                                        waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {

                                            //edit the answer
                                            let answer = answerOrganizerQuestionPage.getAnswer()
                                            browser.wait(ExpectedConditions.presenceOf(answer),
                                                waitTimeout, 'The input for answer was not present').then(function () {
                                                    let newAnswer: string = 'Answer must be 42'
                                                    answer.clear()
                                                    answer.sendKeys(newAnswer)

                                                    //press next
                                                    let nextButton = answerOrganizerQuestionPage.getNextButton()
                                                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton), waitTimeout,
                                                        'Next button from Answer-organizer-question was not clickable').then(function () {
                                                            nextButton.click().then(function () {
                                                                browser.wait(ExpectedConditions.and(
                                                                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                                    ExpectedConditions.urlContains('/teams')),
                                                                    waitTimeout, 'User was not taken back to Pick-a-team Page ' +
                                                                    'after editing his answer').then(function () {

                                                                        //pres previous again
                                                                        previousButton = pickTeamPage.getPreviousButton()
                                                                        browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                                                                            waitTimeout, 'Previous button was not clickable when returning ' +
                                                                            'to Pick-a-team page').then(function () {
                                                                                previousButton.click().then(function () {
                                                                                    //check to see if the answer is the one that was edited
                                                                                    let answer = answerOrganizerQuestionPage.getAnswer()
                                                                                    browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                                                                                        'The new answer to the organizer question was not present').then(function () {
                                                                                            answer.getAttribute('value').then((answer) => {
                                                                                                expect(answer).toMatch(newAnswer,
                                                                                                    'The new answer was not save correctly')
                                                                                                answerOrganizerQuestionPage.getNextButton().click().then(function () {
                                                                                                    browser.wait(ExpectedConditions.and(
                                                                                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                                                                        ExpectedConditions.urlContains('/teams')),
                                                                                                        waitTimeout, 'User was not taken back to Pick-a-team Page')
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
                                })
                            })
                    })
            })

        it('Next button is clickable only if the available team is selected ', function () {
            joinATeam(pickTeamPage, waitTimeout, 'KPC1', answerTeamQuestionPage).then(function () {
                //team should appear as selected
                let selectedTeam = pickTeamPage.getSelectedTeam(0)
                browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                    waitTimeout, 'The selected team was not present')
                let nextButton = pickTeamPage.getNextButton()
                browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                    waitTimeout, 'Next button was not clickable when the team was clicked')
                expect(true).toBeTruthy()
            })
        })

    })

    describe('Showing the team', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, KPC_INCOMPLETE_APP)
                .then(() => browser.get('/apply/KPC1/application/KPC_INCOMPLETE_APP/teams'))
                .then(done)
        })

        it('it should display only the available team ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The available team was not present').then(function () {
                            pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                                expect(nrteams).toBe(1, 'There was not only one team displayed')
                            })
                        })
                })
        })

        it('it should display the title and the icon of the team ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The available team was not present').then(function () {

                            let kpc1_1 = fullyLoaded['oppAllowedTeam']['KPC1-1']['team']
                            pickTeamPage.getAvailableTeamTitle(team).getText().then((title) => {
                                expect(title).toMatch(kpc1_1['title'], 'Team title was not correct')
                            })

                            pickTeamPage.getAvailableTeamIcon(team).getAttribute('class').then((className) => {
                                expect(className).toContain(kpc1_1['icon'], 'Team icon was not correct')
                            })

                        })
                })
        })

    })

    describe('Choosing the team ', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, KPC_INCOMPLETE_APP)
                .then(() => browser.get('/apply/KPC1/application/KPC_INCOMPLETE_APP/teams'))
                .then(done)
        })
        it('user can click on the single team, on the next page he can press Previous to return' +
            ' if he do not want to join ', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {

                        //the available team is displayed
                        let team = pickTeamPage.getAvailableTeamLink(0)
                        browser.wait(ExpectedConditions.presenceOf(team),
                            waitTimeout, 'The available team was not present').then(function () {
                                //user clicks on the team
                                pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                                    browser.wait(ExpectedConditions.and(
                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                        ExpectedConditions.urlContains('/teams/KPC1')),
                                        waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {

                                            //on the Answer-team-question page user clicks Previuous 
                                            let previous = answerTeamQuestionPage.getPreviousButton()
                                            browser.wait(ExpectedConditions.elementToBeClickable(previous), waitTimeout,
                                                'Previous button from Answer-team-question was not clickable').then(function () {
                                                    previous.click().then(function () {
                                                        //user is taken back to Apply-team page
                                                        browser.wait(ExpectedConditions.and(
                                                            ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                            ExpectedConditions.urlContains('/teams')),
                                                            waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {

                                                                //the link to join the available team should be present again
                                                                team = pickTeamPage.getAvailableTeamLink(0)
                                                                browser.wait(ExpectedConditions.presenceOf(team),
                                                                    waitTimeout, 'The available team was not present ' +
                                                                    'when returning from Answer-team-question page')
                                                                expect(true).toBeTruthy()
                                                            })
                                                    })
                                                })
                                        })
                                })
                            })
                    })
            })

        it('user can join the team only if answers the team-question', function () {
            joinATeam(pickTeamPage, waitTimeout, 'KPC1', answerTeamQuestionPage).then(function () {
                //team should appear as selected
                let selectedTeam = pickTeamPage.getSelectedTeam(0)
                browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                    waitTimeout, 'The selected team was not present').then(function () {

                        pickTeamPage.getSelectedTeamTitle(selectedTeam).getText().then((title) => {
                            expect(title).toMatch(fullyLoaded['oppAllowedTeam']['KPC1-1']['team']['title'], 'Team title was not correct')
                        })
                        //only one team should be selected
                        pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                            expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
                        })
                    })
            })
        })



        it('it should not display any available team', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    pickTeamPage.getAvailableTeams().count().then((teamsNo) => {
                        expect(teamsNo).toBe(0, 'The number of available teams was not correct')
                    })
                })

        });

        it('Delete button should make the team available again ' +
            'and remove it from selected teams', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                        let selectedTeam = pickTeamPage.getSelectedTeam(0)
                        let deleteButton = pickTeamPage.getDeleteButtton(selectedTeam)
                        deleteButton.click().then(function () {
                            browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                                'The selected team was not deleted').then(function () {
                                    TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, 1)
                                })

                        })
                    })
            });

        it('Delete all button should have the same behaviour ' +
            'as Delete button', function () {
                joinATeam(pickTeamPage, waitTimeout, 'KPC1', answerTeamQuestionPage).then(function () {
                    //team should appear as selected
                    let selectedTeam = pickTeamPage.getSelectedTeam(0)
                    browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                        waitTimeout, 'The selected team was not present')

                    //click Delete all button
                    let deleteButton = pickTeamPage.getDeleteAllButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                        waitTimeout, 'Delete all was not clickable').then(function () {
                            deleteButton.click().then(function () {
                                TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, 1)
                            })
                        })
                })
            })
    })

    //helper functions
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }


})