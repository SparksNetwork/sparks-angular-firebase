import { browser, ExpectedConditions } from 'protractor/built';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { setData, signOut, signIn } from "../../../firebase";
import { USER_VERIFIED_PROFILE } from "../../../fixtures/users";
import { ProjectMultiOppPage } from "../../../po/project.multi-opp.po";
import { OpportunityPage } from "../../../po/opp.partial-discount.po";
import { AnswerOrganizerQuestionPage } from "../../../po/apply.answer-organizer-question.po";
import { confirmPage } from "../shared";

export function joinATeam(pickTeamPage: PickTeamPage, waitTimeout: number, oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {

    return confirmPage('/apply/' + oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/')
        .then(() => {
            //the available team is displayed
            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The first team was not present')

            //user clicks on the team
            return pickTeamPage.getAvailableTeamTitle(team).click()
        })
        .then(() => confirmPage('/apply/' + oppKey + '/application/', '/teams/', 'Answer-team-question', 'first', waitTimeout))
        .then(() => {

            //answer Team-question 
            let answer = answerTeamQuestionPage.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer),
                waitTimeout, 'The input for answer team question was not present')
            answerTeamQuestionPage.getAnswer().sendKeys('Answer is always 42')
            //press join 
            let joinButton = answerTeamQuestionPage.getJoinTeamButton()
            browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                'Join button was not clickable')
            return joinButton.click()
        })
        .then(() =>
            confirmPage('/apply/' + oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))
        .then(() => browser.wait(ExpectedConditions.presenceOf(pickTeamPage.getSelectedTeams().first()),
    20000,'Join-team button did not select the team'))
}


export function GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams: any) {
    let noTeams: number = 0
    for (let key in oppAllowedTeams) {
        if (key.toString().includes('LC1-')) {
            noTeams++
        }
    }
    return noTeams
}

export function TestsForSelectedAndAvailableTeams(pickTeamPage: PickTeamPage, waitTimeout: number, noSelected: number, noAvailable: number) {
    let availableTeam = pickTeamPage.getAvailableTeamLink(0)
    browser.wait(ExpectedConditions.presenceOf(availableTeam),
        waitTimeout, 'The available team was not present')

    pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
        expect(teamsNo).toBe(noSelected, 'The number of selected teams was not correct')
    })

    pickTeamPage.getAvailableTeams().count().then((nrteams) => {
        expect(nrteams).toBe(noAvailable, 'There was not only one team displayed')
    })
}

