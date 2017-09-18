import 'jasmine'
import { confirmPage, GetKeyFromUrl } from '../shared';
import { browser, ExpectedConditions } from 'protractor/built';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { joinATeam, GetNoAvailableTeamsFromTestData, TestsForSelectedAndAvailableTeams } from '../../helper-functions/shared';

const waitTimeout = 7000

function testPreviuousFunctionality(params) {
    return confirmPage('/apply/' + params.oppKey + '/application/', '/teams', ' Pick-teams', 'first',
        waitTimeout, '/teams/')
        .then(() => {
            let previousButton = params.pickTeamPage.getPreviousButton()
            browser.wait(ExpectedConditions.presenceOf(previousButton),
                waitTimeout, 'On Choose-teams page Previous button was not present')
            return previousButton.click()
        })
        .then(() => confirmPage('/apply/' + params.oppKey + '/application/', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
        .then(() => {
            let question = params.answerOrganizerQuestionPage.getQuestion()
            browser.wait(ExpectedConditions.presenceOf(question),
                waitTimeout, 'On Answer-organizer-question page the text of the question was not present')
            question.getText().then((str) => {
                browser.getCurrentUrl().then((url) => {
                    let opportunityKey: string = GetKeyFromUrl(url, 4)
                    expect(str).toMatch(params.fullyLoaded['opp'][opportunityKey]['question'],
                        'On Answer-organizer-question page the text of the question was not correct')
                    let nextButton = params.answerOrganizerQuestionPage.getNextButton().click()
                        .then(() => confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'second', waitTimeout, '/teams/'))

                })
            })

        })
}

function testUserCanEditAnswerToOrganizerQuestion(params) {

    //press previous from Pick-a-team-page
    let previousButton = params.pickTeamPage.getPreviousButton()
    browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
        waitTimeout, 'On Choose-teams page Previous button was not present')
    return previousButton.click()
        .then(() => confirmPage('/apply/' + params.oppKey + '/application/', '/answer-question', 'Answer-organizer-question', 'first', waitTimeout))
        .then(() => {
            //edit the answer
            let answer = params.answerOrganizerQuestionPage.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer),
                waitTimeout, 'On Answer-organizer-question page the input for answer was not present')
            answer.clear()
            answer.sendKeys(params.answerOrganizerQuestion)

            //press next
            let nextButton = params.answerOrganizerQuestionPage.getNextButton()
            browser.wait(ExpectedConditions.elementToBeClickable(nextButton), waitTimeout,
                'Next button from Answer-organizer-question was not clickable')
            return nextButton.click()
        })
        .then(() => confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'second', waitTimeout, '/teams/'))
        .then(() => {
            //pres previous again
            let previousButton = params.pickTeamPage.getPreviousButton()
            browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                waitTimeout, 'Previous button was not clickable when returning ' +
                'to Pick-teams page')
            return previousButton.click()
        })
        .then(() => {
            //check to see if the answer is the one that was edited
            let answer = params.answerOrganizerQuestionPage.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                'On Choose-teams page the new answer to the organizer question was not present')
            return answer.getAttribute('value')
        })
        .then((answer) => {
            expect(answer).toMatch(params.answerOrganizerQuestion, 'On Choose-teams page the new answer was not saved correctly')
            return params.answerOrganizerQuestionPage.getNextButton().click()
        })
        .then(() => confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'third', waitTimeout, '/teams/'))
}

function testTeamsDetails(params) {

    let teamsLinks = params.pickTeamPage.getTeamLinks()
    browser.wait(ExpectedConditions.presenceOf(teamsLinks.first()),
        waitTimeout, 'On Choose-teams page the first available team was not present')

    let oppAllowedTeams = params.fullyLoaded['oppAllowedTeam']
    return teamsLinks.each(function (item) {
        item.getAttribute('href').then(function (url) {
            params.pickTeamPage.getAvailableTeamTitle(item).getText().then((title) => {
                expect(title).toMatch(params.fullyLoaded['team'][GetKeyFromUrl(url, 1)]['title'],
                    'On Choose-teams page a team title was not correct')
            })

            params.pickTeamPage.getAvailableTeamIcon(item).getAttribute('class').then((className) => {
                expect(className).toContain(params.fullyLoaded['team'][GetKeyFromUrl(url, 1)]['icon'],
                    'On Choose-teams page a team icon was not correct')
            })
        })

    })

}

function testPreviousButtonFunctionalityFromAnswerTeamQuestionPage(params) {

    return confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
        .then(() => {
            //the available team is displayed
            let team = params.pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'On Choose-teams page the available team was not present')
            //user clicks on the team
            return params.pickTeamPage.getAvailableTeamTitle(team).click()
        })
        .then(() =>
            confirmPage('/apply/' + params.oppKey + '/application/', '/teams/' + params.oppKey, 'Answer-team-question', 'first', waitTimeout))
        .then(() => {
            //on the Answer-team-question page user clicks Previuous 
            let previous = params.answerTeamQuestionPage.getPreviousButton()
            browser.wait(ExpectedConditions.elementToBeClickable(previous), waitTimeout,
                'Previous button from Answer-team-question was not clickable')
            return previous.click()
        })
        .then(() =>
            //user is taken back to Apply-team page
            confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'second', waitTimeout, '/teams/'))

        .then(() => {
            //the link to join the available team should be present again
            let team = params.pickTeamPage.getAvailableTeamLink(0)
            return browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The available team was not present ' +
                'when returning from Answer-team-question page')

        })
}

function testDeleteFunctionality(params) {
    return joinATeam(params.pickTeamPage, waitTimeout, params.oppKey, params.answerTeamQuestionPage)
        .then(() => {
            //team should appear as selected
            let selectedTeam = params.pickTeamPage.getSelectedTeam(0)
            browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                waitTimeout, 'On Choose-teams page the selected team was not present')

            params.pickTeamPage.getSelectedTeamTitle(selectedTeam).getText().then((title) => {
                expect(title).toMatch(params.fullyLoaded['team'][params.teamKey]['title'],
                    'On Choose-teams page team title was not correct')
            })
            //only one team should be selected
            return params.pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                expect(teamsNo).toBe(1, 'On Choose-teams page the number of selected teams was not correct')
            })
        })
        .then(() => {

            return params.pickTeamPage.getAvailableTeams().count()
                .then((teamsNo) => {
                    expect(teamsNo).toBe(GetNoAvailableTeamsFromTestData(params.fullyLoaded['oppAllowedTeam'], params.oppKey) - 1,
                        'On Choose-teams page the number of available teams was not correct')
                })
        })
        .then(() => {
            let selectedTeam = params.pickTeamPage.getSelectedTeam(0)
            browser.wait(ExpectedConditions.presenceOf(selectedTeam), waitTimeout,
                'On Choose-teams page there was not any selected team to delete')
            let deleteButton = params.pickTeamPage.getDeleteButtton(selectedTeam)
            deleteButton.click()
                .then(() => {
                    return browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                        'On Choose-teams page the selected team was not deleted')
                })
                .then(() => {
                    TestsForSelectedAndAvailableTeams(params.pickTeamPage, waitTimeout, 0,
                        GetNoAvailableTeamsFromTestData(params.fullyLoaded['oppAllowedTeam'], params.oppKey))

                })

        })
}


export function testsForChooseTeamsPage(params) {

    return testPreviuousFunctionality(params)
        .then(() => testUserCanEditAnswerToOrganizerQuestion(params))
        .then(() => testTeamsDetails(params))
        .then(() => testPreviousButtonFunctionalityFromAnswerTeamQuestionPage(params))
        .then(() => testDeleteFunctionality(params))

}
