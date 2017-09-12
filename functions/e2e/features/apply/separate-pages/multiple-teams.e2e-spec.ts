import 'jasmine'
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE, USER_VERIFIED_NO_PROFILE, USER_NOT_VERIFIED } from '../../../fixtures/users';
import { joinATeam, GetNoAvailableTeamsForLCFromTestData, TestsForSelectedAndAvailableTeams } from '../../helper-functions/choose-teams/choose-teams-functions'
import { LC_INCOMPLETE_APP, LC_INCOMPLETE_APP_USER_VER_NO_PROFILE, LC_INCOMPLETE_APP_USER_VER_ONLY_FNAME, LC_INCOMPLETE_APP_USER_NOT_VER } from '../../../fixtures/applications/application';
import { ApplicationStages } from '../../../fixtures/applications/application-stages';
import { USER_VERIFIED_LNAME } from '../../../fixtures/users-partial-profile';
import { confirmPage } from '../../helper-functions/navigation/navigation-functions';


const waitTimeout = 7000
describe('Apply-Choose-Teams: user must have complete and verified profile before choosing teams', () => {
    let answerOrganizerQuestionPage: AnswerOrganizerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestionPage: AnswerTeamQuestionPage

    const organizerQuestionAnswer = 'Answer may be 42'
    const fullyLoaded = require('../../../fixtures/fully-loaded.json')
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
                confirmPage('/apply/LC1/application/', '/teams', ' Pick-teams', 'first', waitTimeout, '/teams/')
                    .then(() => {
                        let previousButton = pickTeamPage.getPreviousButton()
                        browser.wait(ExpectedConditions.presenceOf(previousButton),
                            waitTimeout, 'Previous button was not present')
                        return previousButton.click()
                    })
                    .then(() => confirmPage('/apply/LC1/application/', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
                    .then(() => {
                        let question = answerOrganizerQuestionPage.getQuestion()
                        browser.wait(ExpectedConditions.presenceOf(question),
                            waitTimeout, 'The text of the question was not present')
                        question.getText().then((str) => {
                            browser.getCurrentUrl().then((url) => {
                                let oppKey: string = GetOppKey(url)
                                expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                    'The text of the question was not correct')
                                let nextButton = answerOrganizerQuestionPage.getNextButton().click()
                                    .then(() => confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'second', waitTimeout, '/teams/'))

                            })
                        })

                    })

            })

            it('Previous button should allow user to edit his answer ' +
                'to Organizer Question', function () {
                    let newAnswer: string = 'Answer must be 42'
                    confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
                        .then(() => {
                            //press previous from Pick-a-team-page
                            let previousButton = pickTeamPage.getPreviousButton()
                            browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                                waitTimeout, 'Previous button was not present')
                            return previousButton.click()
                        })
                        .then(() => confirmPage('/apply/LC1/application/', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
                        .then(() => {
                            //edit the answer
                            let answer = answerOrganizerQuestionPage.getAnswer()
                            browser.wait(ExpectedConditions.presenceOf(answer),
                                waitTimeout, 'The input for answer was not present')
                            answer.clear()
                            answer.sendKeys(newAnswer)

                            //press next
                            let nextButton = answerOrganizerQuestionPage.getNextButton()
                            browser.wait(ExpectedConditions.elementToBeClickable(nextButton), waitTimeout,
                                'Next button from Answer-organizer-question was not clickable')
                            return nextButton.click()
                        })
                        .then(() => confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'second', waitTimeout, '/teams/'))
                        .then(() => {
                            //pres previous again
                            let previousButton = pickTeamPage.getPreviousButton()
                            browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                                waitTimeout, 'Previous button was not clickable when returning ' +
                                'to Pick-teams page')
                            return previousButton.click()
                        })
                        .then(() => {
                            //check to see if the answer is the one that was edited
                            let answer = answerOrganizerQuestionPage.getAnswer()
                            browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                                'The new answer to the organizer question was not present')
                            return answer.getAttribute('value')
                        })
                        .then((answer) => {
                            expect(answer).toMatch(newAnswer, 'The new answer was not save correctly')
                            return answerOrganizerQuestionPage.getNextButton().click()
                        })
                        .then(() => confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'third', waitTimeout, '/teams/'))
                })


            it('Next button is clickable only if the available team is selected ', function () {
                joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage)
                    .then(() => {
                        //team should appear as selected
                        let selectedTeam = pickTeamPage.getSelectedTeam(0)
                        browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                            waitTimeout, 'The selected team was not present')
                        let nextButton = pickTeamPage.getNextButton()
                        return browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                            waitTimeout, 'Next button was not clickable when the team was clicked')
                    })

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

            confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
                .then(() => {
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    return browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The first available team was not present')
                })
                .then(() => {
                    return pickTeamPage.getAvailableTeams().count().then((noteams) => {
                        expect(noteams).toBe(GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams),
                            'The number of available teams is not correct')
                    })
                })
        })


        it('It should display the title and the icon of the teams ', function () {

            confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
                .then(() => {
                    let teamsLinks = pickTeamPage.getTeamLinks()
                    browser.wait(ExpectedConditions.presenceOf(teamsLinks.first()),
                        waitTimeout, 'The first available team was not present')

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

    describe('Choosing the team ', () => {
        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_PROFILE, LC_INCOMPLETE_APP)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP/teams'))
                .then(done)
        })

        it('User can click on a team, on the next page he can press Previous to return' +
            ' if he do not want to join ', function () {

                confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
                    .then(() => {
                        //the available team is displayed
                        let team = pickTeamPage.getAvailableTeamLink(0)
                        browser.wait(ExpectedConditions.presenceOf(team),
                            waitTimeout, 'The available team was not present')
                        //user clicks on the team
                        return pickTeamPage.getAvailableTeamTitle(team).click()
                    })
                    .then(() =>
                        confirmPage('/apply/LC1/application/', '/teams/LC1', 'Answer-team-question', 'first', waitTimeout))
                    .then(() => {
                        //on the Answer-team-question page user clicks Previuous 
                        let previous = answerTeamQuestionPage.getPreviousButton()
                        browser.wait(ExpectedConditions.elementToBeClickable(previous), waitTimeout,
                            'Previous button from Answer-team-question was not clickable')
                        return previous.click()
                    })
                    .then(() =>
                        //user is taken back to Apply-team page
                        confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'second', waitTimeout, '/teams/'))

                    .then(() => {
                        //the link to join the available team should be present again
                        let team = pickTeamPage.getAvailableTeamLink(0)
                        return browser.wait(ExpectedConditions.presenceOf(team),
                            waitTimeout, 'The available team was not present ' +
                            'when returning from Answer-team-question page')

                    })
            })




        it('User can join a team only if answers the team-question', function () {
            joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage)
                .then(() => {
                    //team should appear as selected
                    let selectedTeam = pickTeamPage.getSelectedTeam(0)
                    browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                        waitTimeout, 'The selected team was not present')

                    pickTeamPage.getSelectedTeamTitle(selectedTeam).getText().then((title) => {
                        expect(title).toMatch(fullyLoaded['oppAllowedTeam']['LC1-LC1']['team']['title'], 'Team title was not correct')
                    })
                    //only one team should be selected
                    pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                        expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
                    })
                })
        })


        it('It should display the rest of the available teams', function () {
            confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
                .then(() => {
                    return pickTeamPage.getAvailableTeams().count()
                        .then((teamsNo) => {
                            expect(teamsNo).toBe(GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams) - 1,
                                'The number of available teams was not correct')
                        })

                })
        })

        it('Delete button should make the team available again ' +
            'and remove it from selected teams', function () {
                confirmPage('/apply/LC1/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
                    .then(() => {
                        let selectedTeam = pickTeamPage.getSelectedTeam(0)
                        browser.wait(ExpectedConditions.presenceOf(selectedTeam), waitTimeout,
                            'There was not any selected team to delete')
                        let deleteButton = pickTeamPage.getDeleteButtton(selectedTeam)
                        deleteButton.click()
                            .then(() => {
                                return browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                                    'The selected team was not deleted')
                            })
                            .then(() => {
                                TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams))

                            })

                    })
            })



        it('If user joined more teams DeleteAll button will remove all the selected teams', function () {
            joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage)
                .then(() => joinATeam(pickTeamPage, waitTimeout, 'LC1', answerTeamQuestionPage))
                .then(() => {
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
                        waitTimeout, 'Delete all was not clickable')
                    deleteButton.click()

                    return browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                        'Delete all button did not become invisible')
                })
                .then(() => {
                    TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams))

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
            confirmPage('/apply/LC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout)
            expect(true).toBeTruthy()

        })

    })


    describe('User verified and only legal name completed', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_VERIFIED_LNAME, LC_INCOMPLETE_APP_USER_VER_ONLY_FNAME)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_VER_ONLY_FNAM/teams'))
                .then(done)
        })

        it('It should be redirected to Complete-profile page', function () {
            confirmPage('/apply/LC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout)
            expect(true).toBeTruthy()
        })

    })


    describe('User not verified', () => {

        beforeAll(done => {
            ApplicationStages.userWithApplication(USER_NOT_VERIFIED, LC_INCOMPLETE_APP_USER_NOT_VER)
                .then(() => browser.get('/apply/LC1/application/LC_INCOMPLETE_APP_USER_NOT_VER/teams'))
                .then(done)
        })

        it('It should be redirected to Email-not-verified page', function () {
            confirmPage('/auth/email-not-verified', '', 'Email-not-verified', 'first', waitTimeout)
            expect(true).toBeTruthy()

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
