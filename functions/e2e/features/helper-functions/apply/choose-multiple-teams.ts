import 'jasmine'
import { joinATeam, GetNoAvailableTeamsForLCFromTestData, TestsForSelectedAndAvailableTeams } from "../choose-teams/choose-teams-functions";
import { AnswerTeamQuestionPage } from "../../../po/apply.answer-team-question.po";
import { PickTeamPage } from "../../../po/apply.choose.team.po";
import { browser, ExpectedConditions } from "protractor/built";
import { GetKeyFromUrl } from "../shared";

const waitTimeout = 7000

function testDeleteAllFunctionality(pickTeamPage: PickTeamPage, fullyLoaded: any,
    oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {

    return joinATeam(pickTeamPage, waitTimeout, oppKey, answerTeamQuestionPage)
        .then(() => joinATeam(pickTeamPage, waitTimeout, oppKey, answerTeamQuestionPage))
        .then(() => {
            let selectedTeams = pickTeamPage.getSelectedTeams()
            browser.wait(ExpectedConditions.presenceOf(selectedTeams.first()), waitTimeout,
                'On Choose-multiple-teams page there was not any team selected')
            pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                expect(teamsNo).toBe(2, 'On Choose-multiple-teams page the number of selected teams was not correct')
            })
            pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                expect(nrteams).toBe(GetNoAvailableTeamsForLCFromTestData(fullyLoaded['oppAllowedTeam'], oppKey) - 2,
                    'On Choose-multiple-teams page the number of available teams was not correct')
            })

            //click Delete all button
            let deleteButton = pickTeamPage.getDeleteAllButton()
            browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                waitTimeout, 'On Choose-multiple-teams page Delete all was not clickable')
            deleteButton.click()

            return browser.wait(ExpectedConditions.invisibilityOf(deleteButton), waitTimeout,
                'On Choose-multiple-teams page Delete all button did not become invisible')
        })
        .then(() => {
            TestsForSelectedAndAvailableTeams(pickTeamPage, waitTimeout, 0, GetNoAvailableTeamsForLCFromTestData(fullyLoaded['oppAllowedTeam'], oppKey))

        })
}

function testAllTeamsArePresent(pickTeamPage: PickTeamPage, oppKey: string,
    fullyLoaded: any) {
    let teamLinks = pickTeamPage.getTeamLinks()
    browser.wait(ExpectedConditions.presenceOf(teamLinks.first()),
        waitTimeout, 'On Choose-multiple-teams page first link to team was not present')

    //looping through all the keys and see if all projects are displayed 
    let isPresent: boolean = false;
    let oppAllowedTeams = fullyLoaded['oppAllowedTeam']
    for (let key in oppAllowedTeams) {
        if (key.toString().includes(oppKey + '-')) {
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

export function testsForChooseMultipleTeamsPage(pickTeamPage: PickTeamPage, fullyLoaded: any,
    oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {
        
    testAllTeamsArePresent(pickTeamPage, oppKey, fullyLoaded)
    return testDeleteAllFunctionality(pickTeamPage, fullyLoaded, oppKey, answerTeamQuestionPage)
}