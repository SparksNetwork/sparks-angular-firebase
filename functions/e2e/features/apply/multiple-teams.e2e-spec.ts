import 'jasmine'
import { AnswerOrganizerQuestionPage } from '../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE, USER_VERIFIED_NO_PROFILE, USER_NOT_VERIFIED } from '../../fixtures/users';
import { joinATeam, GetNoAvailableTeamsForLCFromTestData, TestsForSelectedAndAvailableTeams } from './helper-functions'
import { LC_INCOMPLETE_APP, LC_INCOMPLETE_APP_USER_VER_NO_PROFILE, LC_INCOMPLETE_APP_USER_VER_ONLY_FNAME, LC_INCOMPLETE_APP_USER_NOT_VER } from "../../fixtures/applications/application";
import { ApplicationStages } from "../../fixtures/applications/application-stages";
import { USER_VERIFIED_LNAME } from "../../fixtures/users-partial-profile";


const waitTimeout = 7000
describe('Apply-Choose-Teams: user must have complete and verified profile before choosing teams', () => {
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage

    const organizerQuestionAnswer = 'Answer may be 42'
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const oppAllowedTeams = fullyLoaded['oppAllowedTeam']

    beforeAll(done => {

        answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestionPage = new AnswerTeamQuestionPage()
        browser.waitForAngularEnabled(false).then(done)
    })

    describe('User with verified and complete profile', () => {

        describe('Checking Previous and Next buttons functionality', () => {
            beforeAll(done => {
                ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, LC_INCOMPLETE_APP)
                    .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/teams'))
                    .then(done)
            })

            it('Previous button should take user back to Organizer Question', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                        let previousButton = pickTeamPage.getPreviousButton()
                        browser.wait(ExpectedConditions.presenceOf(previousButton),
                            waitTimeout, 'Previous button was not present').then(function () {
                                previousButton.click().then(function () {
                                    browser.wait(ExpectedConditions.and(
                                        ExpectedConditions.urlContains('/apply/LC1/application/'),
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
                                                                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                                                                    ExpectedConditions.urlContains('/teams'),
                                                                    ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                                                                    waitTimeout, 'User was not taken back to Pick-teams Page')
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
                        ExpectedConditions.urlContains('/apply/LC1/application/'),
                        ExpectedConditions.urlContains('/teams'),
                        ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                        waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                            //press previous from Pick-a-team-page
                            let previousButton = pickTeamPage.getPreviousButton()
                            browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                                waitTimeout, 'Previous button was not present').then(function () {
                                    previousButton.click().then(function () {
                                        browser.wait(ExpectedConditions.and(
                                            ExpectedConditions.urlContains('/apply/LC1/application/'),
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
                                                                        ExpectedConditions.urlContains('/apply/LC1/application/'),
                                                                        ExpectedConditions.urlContains('/teams')),
                                                                        waitTimeout, 'User was not taken back to Pick-teams Page ' +
                                                                        'after editing his answer').then(function () {

                                                                            //pres previous again
                                                                            previousButton = pickTeamPage.getPreviousButton()
                                                                            browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                                                                                waitTimeout, 'Previous button was not clickable when returning ' +
                                                                                'to Pick-teams page').then(function () {
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
                                                                                                            ExpectedConditions.urlContains('/apply/LC1/application/'),
                                                                                                            ExpectedConditions.urlContains('/teams'),
                                                                                                            ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                                                                                                            waitTimeout, 'User was not taken back to Pick-teams Page')

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
                joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage).then(function () {
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

        describe('Showing the teams', () => {
            beforeAll(done => {
                ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, LC_INCOMPLETE_APP)
                    .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/teams'))
                    .then(done)
            })

            it('All teams from test data file should be present', () => {
                let teamLinks = pickTeamPage.getTeamLinks()
                browser.wait(ExpectedConditions.presenceOf(teamLinks.first()),
                    waitTimeout, 'First link was not present')

                //looping through all the keys and see if all projects are displayed 
                let isPresent: boolean = false;
                for (let key in oppAllowedTeams) {
                    if (key.toString().includes('LC1-')) {
                        isPresent = false;
                        teamLinks.each(function (item) {
                            item.getAttribute('href').then(function (url) {
                                if (key.toString().endsWith(GetTeamKey(url))) {
                                    isPresent = true;
                                }
                            })

                        }).then(function () {
                            expect(isPresent).toBe(true, 'Team with key ' + key.toString() + ' was not present');
                        })
                    }
                }
            })

            it('It should display ' + GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams).toString() + ' teams', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                    ExpectedConditions.urlContains('/teams'),
                    ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                    waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                        let team = pickTeamPage.getAvailableTeamLink(0)
                        browser.wait(ExpectedConditions.presenceOf(team),
                            waitTimeout, 'The first available team was not present').then(function () {
                                pickTeamPage.getAvailableTeams().count().then((noteams) => {
                                    expect(noteams).toBe(GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams), 'The number of available teams is not correct')
                                })
                            })
                    })
            })

            it('It should display the title and the icon of the teams ', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                    ExpectedConditions.urlContains('/teams'),
                    ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                    waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                        let teamsLinks = pickTeamPage.getTeamLinks()
                        browser.wait(ExpectedConditions.presenceOf(teamsLinks.first()),
                            waitTimeout, 'The first available team was not present').then(function () {

                                teamsLinks.each(function (item) {
                                    item.getAttribute('href').then(function (url) {
                                        pickTeamPage.getAvailableTeamTitle(item).getText().then((title) => {
                                            expect(title).toMatch(oppAllowedTeams[GetOppKeyFromAnswerTeamQuestionPage(url) + '-' + GetTeamKey(url)]['team']['title'], 'Team title was not correct')
                                        })

                                        pickTeamPage.getAvailableTeamIcon(item).getAttribute('class').then((className) => {
                                            expect(className).toContain(oppAllowedTeams[GetOppKeyFromAnswerTeamQuestionPage(url) + '-' + GetTeamKey(url)]['team']['icon'], 'Team icon was not correct')
                                        })
                                    })
                                })

                            })
                    })
            })

        })

        describe('Choosing the team ', () => {
            beforeAll(done => {
                ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, LC_INCOMPLETE_APP)
                    .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/teams'))
                    .then(done)
            })

            it('User can click on a team, on the next page he can press Previous to return' +
                ' if he do not want to join ', function () {
                    browser.wait(ExpectedConditions.and(
                        ExpectedConditions.urlContains('/apply/LC1/application/'),
                        ExpectedConditions.urlContains('/teams'),
                        ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                        waitTimeout, 'User was not taken to Pick-teams Page').then(function () {

                            //the available team is displayed
                            let team = pickTeamPage.getAvailableTeamLink(0)
                            browser.wait(ExpectedConditions.presenceOf(team),
                                waitTimeout, 'The available team was not present').then(function () {
                                    //user clicks on the team
                                    pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                                        browser.wait(ExpectedConditions.and(
                                            ExpectedConditions.urlContains('/apply/LC1/application/'),
                                            ExpectedConditions.urlContains('/teams/LC1')),
                                            waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {

                                                //on the Answer-team-question page user clicks Previuous 
                                                let previous = answerTeamQuestionPage.getPreviousButton()
                                                browser.wait(ExpectedConditions.elementToBeClickable(previous), waitTimeout,
                                                    'Previous button from Answer-team-question was not clickable').then(function () {
                                                        previous.click().then(function () {
                                                            //user is taken back to Apply-team page
                                                            browser.wait(ExpectedConditions.and(
                                                                ExpectedConditions.urlContains('/apply/LC1/application/'),
                                                                ExpectedConditions.urlContains('/teams')),
                                                                waitTimeout, 'User was not taken to Pick-teams Page').then(function () {

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

            it('User can join a team only if answers the team-question', function () {
                joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage).then(function () {
                    //team should appear as selected
                    let selectedTeam = pickTeamPage.getSelectedTeam(0)
                    browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                        waitTimeout, 'The selected team was not present').then(function () {

                            pickTeamPage.getSelectedTeamTitle(selectedTeam).getText().then((title) => {
                                expect(title).toMatch(fullyLoaded['oppAllowedTeam']['LC1-LC1']['team']['title'], 'Team title was not correct')
                            })
                            //only one team should be selected
                            pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                                expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
                            })
                        })
                })
            })

            it('It should display the rest of the available teams', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/LC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                        pickTeamPage.getAvailableTeams().count().then((teamsNo) => {
                            expect(teamsNo).toBe(GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams) - 1, 'The number of available teams was not correct')
                        })
                    })

            })

            it('Delete button should make the team available again ' +
                'and remove it from selected teams', function () {
                    browser.wait(ExpectedConditions.and(
                        ExpectedConditions.urlContains('/apply/LC1/application/'),
                        ExpectedConditions.urlContains('/teams'),
                        ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                        waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                            let selectedTeam = pickTeamPage.getSelectedTeam(0)
                            browser.wait(ExpectedConditions.presenceOf(selectedTeam), waitTimeout,
                                'There was not any selected team to delete').then(function () {
                                    let deleteButton = pickTeamPage.getDeleteButtton(selectedTeam)
                                    deleteButton.click().then(function () {
                                        browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                                            'The selected team was not deleted').then(function () {
                                                TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams))

                                            })

                                    })
                                })
                        })

                });

            it('If user joined more teams DeleteAll button will remove all the selected teams', function () {
                joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage).then(() => {
                    joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage).then(() => {
                        let selectedTeams = pickTeamPage.getSelectedTeams()
                        browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()), waitTimeout,
                            'There was not any team selected')
                        pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                            expect(teamsNo).toBe(2, 'The number of selected teams was not correct')
                        })

                        pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                            expect(nrteams).toBe(GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams) - 2,
                                'The number of available teams was not correct')
                        })

                        //click Delete all button
                        let deleteButton = pickTeamPage.getDeleteAllButton()
                        browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                            waitTimeout, 'Delete all was not clickable').then(function () {
                                deleteButton.click().then(function () {
                                    browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                                        'Delete all button did not become invisible').then(function () {
                                            TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams))

                                        })
                                })
                            })
                    })
                })
            })


        })

    })

    describe('User verified and no profile', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_NO_PROFILE, LC_INCOMPLETE_APP_USER_VER_NO_PROFILE)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_VER_NO_PROFILE/teams'))
                .then(done)
        })

        it('It should be redirected to Complete-profile page', function () {
            browser.wait(ExpectedConditions.urlContains('/apply/LC1/complete-profile'),
                waitTimeout, 'User was not taken to Complete-profile Page').then(function () {
                    expect(true).toBeTruthy()
                })
        })

    })


    describe('User verified and only legal name completed', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_LNAME, LC_INCOMPLETE_APP_USER_VER_ONLY_FNAME)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_VER_ONLY_FNAM/teams'))
                .then(done)
        })

        it('It should be redirected to Complete-profile page', function () {
            browser.wait(ExpectedConditions.urlContains('/apply/LC1/complete-profile'),
                waitTimeout, 'User was not taken to Complete-profile Page').then(function () {
                    expect(true).toBeTruthy()
                })
        })

    })


    describe('User not verified', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_NOT_VERIFIED, LC_INCOMPLETE_APP_USER_NOT_VER)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_NOT_VER/teams'))
                .then(done)
        })

        it('It should be redirected to Email-not-verified page', function () {
            browser.wait(ExpectedConditions.urlContains('/auth/email-not-verified'),
                waitTimeout, 'User was not taken to Email-not-verified Page').then(function () {
                    expect(true).toBeTruthy()
                })
        })

    })


    //helper functions
    function GetTeamKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 1];
    }
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }
    function GetOppKeyFromAnswerTeamQuestionPage(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 5];
    }

})