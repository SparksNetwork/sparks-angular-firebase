import { confirmPage } from '../shared';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { joinATeam, TestsForSelectedAndAvailableTeams, WAIT_TIMEOUT } from '../../helper-functions/shared';
import { ParamsObject } from './params-object';

function testTeamDetails(params:ParamsObject) {
    return confirmPage('/apply/' + params.oppKey, '/teams', 'Pick-teams', 'first', '/teams/')
        .then(function () {


            //looping through all the keys and see if all projects are displayed 
            let isPresent: boolean = false;
            let oppAllowedTeams = params.fullyLoaded['oppAllowedTeam']
            let oppAllowedTeamKey;
            for (let key in oppAllowedTeams) {
                if (key.toString().includes(params.oppKey + '-')) {
                    isPresent = true;
                    oppAllowedTeamKey = key.toString()
                }
            }

            let team = params.pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                WAIT_TIMEOUT, 'On Choose-single-team page the available team was not present')

            let kpc1_1 = params.fullyLoaded['oppAllowedTeam'][oppAllowedTeamKey]['team']
            params.pickTeamPage.getAvailableTeamTitle(team).getText().then((title) => {
                expect(title).toMatch(kpc1_1['title'],
                    'On Choose-single-team page team title was not correct')
            })

            params.pickTeamPage.getAvailableTeamIcon(team).getAttribute('class').then((className) => {
                expect(className).toContain(kpc1_1['icon'],
                    'On Choose-single-team page team icon was not correct')
            })


        })
}

function testDeleteAllFunctionality(params:ParamsObject) {
    return joinATeam(params.pickTeamPage, params.oppKey, params.answerTeamQuestionPage)
        .then(() => {
            //team should appear as selected
            let selectedTeam = params.pickTeamPage.getSelectedTeam(0)
            browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                WAIT_TIMEOUT, 'The selected team was not present')

            //click Delete all button
            let deleteButton = params.pickTeamPage.getDeleteAllButton()
            browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                WAIT_TIMEOUT, 'Delete all was not clickable')
            return deleteButton.click()
        })
        .then(function () {
            TestsForSelectedAndAvailableTeams(params.pickTeamPage, 0, 1)
        })

}

export function testsForChooseSingleTeamsPage(params:ParamsObject) {

    testTeamDetails(params)
        .then(() => testDeleteAllFunctionality(params))
}