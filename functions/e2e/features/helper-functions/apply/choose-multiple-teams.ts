import 'jasmine'
import { joinATeam, GetNoAvailableTeamsFromTestData, TestsForSelectedAndAvailableTeams } from '../../helper-functions/shared';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { GetKeyFromUrl } from '../shared';
import { ParamsObject } from './params-object';

const waitTimeout = 7000

function testDeleteAllFunctionality(params:ParamsObject) {

    return joinATeam(params.pickTeamPage, waitTimeout, params.oppKey, params.answerTeamQuestionPage)
        .then(() => joinATeam(params.pickTeamPage, waitTimeout, params.oppKey, params.answerTeamQuestionPage))
        .then(() => {
            let selectedTeams = params.pickTeamPage.getSelectedTeams()
            browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()), waitTimeout,
                'On Choose-multiple-teams page there was not any team selected')
            params.pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                expect(teamsNo).toBe(2, 'On Choose-multiple-teams page the number of selected teams was not correct')
            })
            params.pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                expect(nrteams).toBe(GetNoAvailableTeamsFromTestData(params.fullyLoaded['oppAllowedTeam'], params.oppKey) - 2,
                    'On Choose-multiple-teams page the number of available teams was not correct')
            })

            //click Delete all button
            let deleteButton = params.pickTeamPage.getDeleteAllButton()
            browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                waitTimeout, 'On Choose-multiple-teams page Delete all was not clickable')
            deleteButton.click()

            return browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                'On Choose-multiple-teams page Delete all button did not become invisible')
        })
        .then(() => {
            TestsForSelectedAndAvailableTeams(params.pickTeamPage, waitTimeout, 0,
                GetNoAvailableTeamsFromTestData(params.fullyLoaded['oppAllowedTeam'], params.oppKey))

        })
}

function testAllTeamsArePresent(params:ParamsObject) {
    let teamLinks = params.pickTeamPage.getTeamLinks()
    browser.wait(ExpectedConditions.presenceOf(teamLinks.first()),
        waitTimeout, 'On Choose-multiple-teams page first link to team was not present')

    //looping through all the keys and see if all projects are displayed 
    let isPresent: boolean = false;
    let oppAllowedTeams = params.fullyLoaded['oppAllowedTeam']
    for (let key in oppAllowedTeams) {
        if (key.toString().includes(params.oppKey + '-')) {
            isPresent = false;
            teamLinks.each(function (item) {
                item.getAttribute('href').then(function (url) {
                    if (key.toString().endsWith(GetKeyFromUrl(url, 1))) {
                        isPresent = true;
                    }
                })

            }).then(function () {
                expect(isPresent).toBe(true, 'On Choose-multiple-teams page team with key ' + key.toString() + ' was not present');
            })
        }
    }
    return null;

}

export function testsForChooseMultipleTeamsPage(params:ParamsObject) {

    testAllTeamsArePresent(params)
    return testDeleteAllFunctionality(params)
}