import 'jasmine'
import { ProjectSingleOppPage } from '../../po/project.single-opp.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut } from '../../firebase';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { AnswerQuestionPage } from '../../po/apply.answer-question.po';
import { PickTeamPage } from '../../po/apply.single.team.po';
import { AnswerTeamQuestion } from '../../po/apply.answer-team-question.po';

const waitTimeout = 5000

describe('Apply-Choosing-Teams: verified user with complete profile information', () => {
    let KPCprojectPage: ProjectSingleOppPage
    let answerQuestionPage: AnswerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestion: AnswerTeamQuestion

    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
        KPCprojectPage = new ProjectSingleOppPage();
        answerQuestionPage = new AnswerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestion = new AnswerTeamQuestion()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(done)
    });

    describe('Checking Previous button functionality', () => {
        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('Previous button should take user back to Organizer Question', function () {

            let previousButton = pickTeamPage.getPreviousButton()
            browser.wait(ExpectedConditions.presenceOf(previousButton),
                waitTimeout, 'Previous button was not present')
            previousButton.click();

            browser.wait(ExpectedConditions.urlContains('/answer-question'),
                waitTimeout, 'User was not taken to Answer-organizer-question')

            let question = answerQuestionPage.getQuestion()
            browser.wait(ExpectedConditions.presenceOf(question),
                waitTimeout, 'The text of the question was not present')
            question.getText().then((str) => {
                browser.getCurrentUrl().then((url) => {
                    let oppKey: string = GetOppKey(url)
                    expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                        'The text of the question was not correct')
                })
            })

            let nextButton = answerQuestionPage.getNextButton().click()
            browser.wait(ExpectedConditions.urlContains('/teams'),
                waitTimeout, 'User was not taken back to Pick-a-team page')

        });

        it('Previous button should allow user to edit his answer ' +
            'to Organizer Question', function () {
                //press previous from Pick-a-team-page
                let previousButton = pickTeamPage.getPreviousButton()
                browser.wait(ExpectedConditions.presenceOf(previousButton),
                    waitTimeout, 'Previous button was not present')
                previousButton.click();

                browser.wait(ExpectedConditions.urlContains('/answer-question'),
                    waitTimeout, 'User was not taken to Answer-organizer-question')

                //edit the answer
                let answer = answerQuestionPage.getAnswer()
                browser.wait(ExpectedConditions.presenceOf(answer),
                    waitTimeout, 'The input for answer was not present')
                let newAnswer: string = 'Answer must 42'
                answerQuestionPage.getAnswer().sendKeys(newAnswer)

                //press next
                let nextButton = answerQuestionPage.getNextButton().click()
                browser.wait(ExpectedConditions.urlContains('/teams'),
                    waitTimeout, 'User was not taken back to Pick-a-team page')

                //pres previous again
                previousButton = pickTeamPage.getPreviousButton()
                browser.wait(ExpectedConditions.presenceOf(previousButton),
                    waitTimeout, 'Previous button was not present when returning ' +
                    'to Pick-a-team page')
                previousButton.click();

                //check to see if the answer is the one that was edited
                answer = answerQuestionPage.getAnswer()
                answer.getAttribute('value').then((answer) => {
                    expect(answer).toMatch(newAnswer,
                        'The new answer was not save correctly')
                })

                //go back to pick a team page
                nextButton = answerQuestionPage.getNextButton().click()
                browser.wait(ExpectedConditions.urlContains('/teams'),
                    waitTimeout, 'Finally, user was not taken back to Pick-a-team page')

            });

    })

    describe('Showing the team', () => {
        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('it should display only the available team ', function () {
            browser.wait(ExpectedConditions.urlContains('/teams'),
                waitTimeout, 'User was not taken to Pick a team page')

            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The available team was not present')

            pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                expect(nrteams).toBe(1, 'There was not only one team displayed')
            })

        });

        it('it should display the title and the icon of the team ', function () {

            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The available team was not present')

            let kpc1_1 = fullyLoaded['oppAllowedTeam']['KPC1-1']['team']
            pickTeamPage.getAvailableTeamTitle(team).getText().then((title) => {
                expect(title).toMatch(kpc1_1['title'], 'Team title was not correct')
            })

            pickTeamPage.getAvailableTeamIcon(team).getAttribute('class').then((className) => {
                expect(className).toContain(kpc1_1['icon'], 'Team icon was not correct')
            })

        });

    })

    describe('Choosing the team ', () => {

        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('user can click on the single team, on the next page he can press Previous to return' +
            ' if he do not want to join ', function () {
                //the available team is displayed
                let team = pickTeamPage.getAvailableTeamLink(0)
                browser.wait(ExpectedConditions.presenceOf(team),
                    waitTimeout, 'The available team was not present')

                //user clicks on the team
                pickTeamPage.getAvailableTeamTitle(team).click()
                browser.wait(ExpectedConditions.urlContains('/teams/KPC1'),
                    waitTimeout, 'User was not taken to Answer team question page')

                //on the Answer-team-question page user clicks Previuous 
                let previous = answerTeamQuestion.getPreviousButton()
                browser.wait(ExpectedConditions.presenceOf(previous),
                    waitTimeout, 'Previous button was missing from Answer team question page')
                previous.click()

                //user is taken back to Apply-team page
                browser.wait(ExpectedConditions.urlContains('/teams'),
                    waitTimeout, 'User was not taken to Answer team question page')

                //the link to join the available team should be present again
                team = pickTeamPage.getAvailableTeamLink(0)
                browser.wait(ExpectedConditions.presenceOf(team),
                    waitTimeout, 'The available team was not present ' +
                    'when returning from Answer-team-question page')
                expect(true).toBeTruthy()

            });

        it('user can join the team only if answers the team-question', function () {
            //the available team is displayed
            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The available team was not present')

            //user clicks on the team
            pickTeamPage.getAvailableTeamTitle(team).click()
            browser.wait(ExpectedConditions.urlContains('/teams/KPC1'),
                waitTimeout, 'User was not taken to Answer team question page')

            //answer Team-question 
            let answer = answerTeamQuestion.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer),
                waitTimeout, 'The input for answer was not present')
            answerQuestionPage.getAnswer().sendKeys('Answer is always 42')

            //press join
            let joinButton = answerTeamQuestion.getJoinTeamButton()
            browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                'Join button was not clickable')
            joinButton.click()

            //team should appear as selected
            let selectedTeam = pickTeamPage.getSelectedTeam(0)
            browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                waitTimeout, 'The selected team was not present')

            //only one team should be selected
            pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
            })

            expect(true).toBeTruthy()

        });

        it('it should display the title of the selected team', function () {

            let selectedTeam = pickTeamPage.getSelectedTeam(0)
            browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                waitTimeout, 'The selected team was not present')

            pickTeamPage.getSelectedTeamTitle(selectedTeam).getText().then((title) => {
                expect(title).toMatch(fullyLoaded['oppAllowedTeam']['KPC1-1']['team']['title'], 'Team title was not correct')
            })

        });

        it('it should not display any available team', function () {

            pickTeamPage.getAvailableTeams().count().then((teamsNo) => {
                expect(teamsNo).toBe(0, 'The number of available teams was not correct')
            })

        });

        it('Delete button should make the team available again ' +
            'and remove it from selected teams', function () {

                let selectedTeam = pickTeamPage.getSelectedTeam(0)
                pickTeamPage.getDeleteButtton(selectedTeam).click()

                CommonTestsForDeleteAndDeleteAll()

            });

        it('Delete all button should have the same behaviour ' +
            'as Delete button', function () {
                //join again a team

                //the available team is displayed
                let team = pickTeamPage.getAvailableTeamLink(0)
                browser.wait(ExpectedConditions.presenceOf(team),
                    waitTimeout, 'The available team was not present')

                //user clicks on the team
                pickTeamPage.getAvailableTeamTitle(team).click()
                browser.wait(ExpectedConditions.urlContains('/teams/KPC1'),
                    waitTimeout, 'User was not taken to Answer team question page')

                //answer Team-question 
                let answer = answerTeamQuestion.getAnswer()
                browser.wait(ExpectedConditions.presenceOf(answer),
                    waitTimeout, 'The input for answer was not present')
                answerQuestionPage.getAnswer().sendKeys('Answer is always 42')

                //press join
                let joinButton = answerTeamQuestion.getJoinTeamButton()
                browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                    'Join button was not clickable')
                joinButton.click()

                //team should appear as selected
                let selectedTeam = pickTeamPage.getSelectedTeam(0)
                browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                    waitTimeout, 'The selected team was not present')

                //click Delete all button
                let deleteButton = pickTeamPage.getDeleteAllButton()
                browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                    waitTimeout, 'Delete all was not clickable')
                deleteButton.click()

                CommonTestsForDeleteAndDeleteAll()

            });


    })

    //helper functions
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 2];
    }

    function StepsToReachApplyChooseTeamsPage(done) {
        browser.get('/')
            .then(() => { setData('/', fullyLoaded) })
            .then(signOut)
            .then(() => { signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password) })
            .then(() => { KPCprojectPage.navigateTo() })
            .then(() => {
                browser.wait(ExpectedConditions.elementToBeClickable(KPCprojectPage.getJoinButton()),
                    waitTimeout, 'Join button was not present')
            })
            .then(() => { KPCprojectPage.getJoinButton().click() })
            .then(() => {
                browser.wait(ExpectedConditions.presenceOf(answerQuestionPage.getNextButton()),
                    waitTimeout, 'Next button was not present')
                answerQuestionPage.getAnswer().sendKeys('42')
            })
            .then(() => {
                let next = answerQuestionPage.getNextButton()
                browser.wait(ExpectedConditions.elementToBeClickable(next),
                    waitTimeout, 'Next button was not clickable')
                next.click()
            })
            .then(done)
    }

    function CommonTestsForDeleteAndDeleteAll() {
        let availableTeam = pickTeamPage.getAvailableTeamLink(0)
        browser.wait(ExpectedConditions.presenceOf(availableTeam),
            waitTimeout, 'The available team was not present')

        pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
            expect(teamsNo).toBe(0, 'The number of selected teams was not correct')
        })

        pickTeamPage.getAvailableTeams().count().then((nrteams) => {
            expect(nrteams).toBe(1, 'There was not only one team displayed')
        })
    }

})