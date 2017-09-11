import { browser, ExpectedConditions } from 'protractor/built';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { setData, signOut, signIn } from "../../../firebase";
import { USER_VERIFIED_PROFILE } from "../../../fixtures/users";
import { ProjectMultiOppPage } from "../../../po/project.multi-opp.po";
import { OpportunityPartialDiscountPage } from "../../../po/opp.partial-discount.po";
import { AnswerOrganizerQuestionPage } from "../../../po/apply.answer-organizer-question.po";

export function joinATeam(pickTeamPage: PickTeamPage, waitTimeout: number, oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {
    return browser.wait(ExpectedConditions.and(
        ExpectedConditions.urlContains('/apply/' + oppKey + '/application/'),
        ExpectedConditions.urlContains('/teams'),
        ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
        waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
            //the available team is displayed
            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                waitTimeout, 'The first team was not present').then(function () {

                    //user clicks on the team
                    pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                        browser.wait(ExpectedConditions.and(
                            ExpectedConditions.urlContains('/apply/' + oppKey + '/application/'),
                            ExpectedConditions.urlContains('/teams/')),
                            waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {
                                //answer Team-question 
                                let answer = answerTeamQuestionPage.getAnswer()
                                browser.wait(ExpectedConditions.presenceOf(answer),
                                    waitTimeout, 'The input for answer team question was not present')
                                answerTeamQuestionPage.getAnswer().sendKeys('Answer is always 42')
                                //press join 
                                let joinButton = answerTeamQuestionPage.getJoinTeamButton()
                                browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                                    'Join button was not clickable').then(function () {

                                        joinButton.click().then(function () {
                                            return browser.wait(ExpectedConditions.and(
                                                ExpectedConditions.urlContains('/apply/' + oppKey + '/application/'),
                                                ExpectedConditions.urlContains('/teams'),
                                                ExpectedConditions.not(ExpectedConditions.urlContains('/teams/'))),
                                                waitTimeout, 'User was not taken back to Pick-teams Page ' +
                                                'after answering the team question')
                                        })
                                    })
                            })
                    })
                })
        })

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

