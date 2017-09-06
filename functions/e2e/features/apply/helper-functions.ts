import { browser, ExpectedConditions } from 'protractor/built';
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestion } from '../../po/apply.answer-team-question.po';

export function joinATeam(pickTeamPage: PickTeamPage, waitTimeout: number, oppKey: string, answerTeamQuestion: AnswerTeamQuestion) {
    return browser.wait(ExpectedConditions.and(
        ExpectedConditions.urlContains('/apply/' + oppKey + '/application/'),
        ExpectedConditions.urlContains('/teams')),
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
                                let answer = answerTeamQuestion.getAnswer()
                                browser.wait(ExpectedConditions.presenceOf(answer),
                                    waitTimeout, 'The input for answer team question was not present')
                                answerTeamQuestion.getAnswer().sendKeys('Answer is always 42')
                                //press join 
                                let joinButton = answerTeamQuestion.getJoinTeamButton()
                                browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                                    'Join button was not clickable').then(function () {

                                        joinButton.click().then(function () {
                                            browser.wait(ExpectedConditions.and(
                                                ExpectedConditions.urlContains('/apply/LC1/application/'),
                                                ExpectedConditions.not(ExpectedConditions.urlContains('/teams/')),
                                                ExpectedConditions.urlContains('/teams')),
                                                waitTimeout, 'User was not taken back to Pick-teams Page ' +
                                                'after answering the team question')
                                        })
                                    })
                            })
                    })
                })
        })

}


export function GetNoAvailableTeamsForLCFromTestData(oppAllowedTeams:any) {
        let noTeams: number = 0
        for (let key in oppAllowedTeams) {
            if (key.toString().includes('LC1-')) {
                noTeams++
            }
        }
        return noTeams
    }