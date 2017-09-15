import { confirmPage } from '../shared';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { joinATeam, TestsForSelectedAndAvailableTeams } from '../../helper-functions/shared';
const waitTimeout = 7000

function testTeamDetails(pickTeamPage: PickTeamPage, fullyLoaded: any, oppKey: string) {
    return confirmPage('/apply/' + oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
        .then(function () {


            //looping through all the keys and see if all projects are displayed 
            let isPresent: boolean = false;
            let oppAllowedTeams = fullyLoaded['oppAllowedTeam']
            let oppAllowedTeamKey;
            for (let key in oppAllowedTeams) {
                if (key.toString().includes(oppKey + '-')) {
                    isPresent = true;
                    oppAllowedTeamKey = key.toString()
                }
            }

            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'On Choose-single-team page the available team was not present')

            let kpc1_1 = fullyLoaded['oppAllowedTeam'][oppAllowedTeamKey]['team']
            pickTeamPage.getAvailableTeamTitle(team).getText().then((title) => {
                expect(title).toMatch(kpc1_1['title'],
                    'On Choose-single-team page team title was not correct')
            })

            pickTeamPage.getAvailableTeamIcon(team).getAttribute('class').then((className) => {
                expect(className).toContain(kpc1_1['icon'],
                    'On Choose-single-team page team icon was not correct')
            })


        })
}

function testDeleteAllFunctionality(pickTeamPage: PickTeamPage, fullyLoaded: any,
    oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {
    return joinATeam(pickTeamPage, waitTimeout, oppKey, answerTeamQuestionPage)
        .then(() => {
            //team should appear as selected
            let selectedTeam = pickTeamPage.getSelectedTeam(0)
            browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                waitTimeout, 'The selected team was not present')

            //click Delete all button
            let deleteButton = pickTeamPage.getDeleteAllButton()
            browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                waitTimeout, 'Delete all was not clickable')
            return deleteButton.click()
        })
        .then(function () {
            TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, 1)
        })

}

export function testsForChooseSingleTeamsPage(pickTeamPage: PickTeamPage, fullyLoaded: any,
    oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {

    testTeamDetails(pickTeamPage, fullyLoaded, oppKey)
        .then(() => testDeleteAllFunctionality(pickTeamPage, fullyLoaded, oppKey, answerTeamQuestionPage))
}