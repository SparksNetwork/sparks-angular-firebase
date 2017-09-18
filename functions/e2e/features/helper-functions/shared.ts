import { browser, ExpectedConditions } from 'protractor';
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';

export function GetKeyFromUrl(url: string, tokenIndex: number) {
    let splittedUrl = url.split('/');
    return splittedUrl[splittedUrl.length - tokenIndex];
}

export function confirmPage(firstPartToContain: string, secondPartToContain: string,
    pageName: string, timeToVisit: string, waitTimeout: number, notToContain?: string) {

    let messageForFail: string = 'User was not taken to ' + pageName + ' page ' +
        'when visiting the page for the ' + timeToVisit + ' time'

    if (notToContain) {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains(firstPartToContain),
            ExpectedConditions.urlContains(secondPartToContain),
            ExpectedConditions.not(ExpectedConditions.urlContains(notToContain))),
            waitTimeout, messageForFail)
    } else {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains(firstPartToContain),
            ExpectedConditions.urlContains(secondPartToContain)),
            waitTimeout, messageForFail)
    }
}


export function joinATeam(pickTeamPage: PickTeamPage, waitTimeout: number,
    oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {

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
            20000, 'Join-team button did not select the team'))
}


export function GetNoAvailableTeamsFromTestData(oppAllowedTeams: any, oppKey: string) {
    let noTeams: number = 0
    for (let key in oppAllowedTeams) {
        if (key.toString().includes(oppKey + '-')) {
            noTeams++
        }
    }
    return noTeams
}

export function TestsForSelectedAndAvailableTeams(pickTeamPage: PickTeamPage, waitTimeout: number, noSelected: number, noAvailable: number) {
    let availableTeam = pickTeamPage.getAvailableTeamLink(0)
    browser.wait(ExpectedConditions.presenceOf(availableTeam),
        waitTimeout, 'On Choose-teams page the available team was not present')

    pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
        expect(teamsNo).toBe(noSelected, 'On Choose-teams page the number of selected teams was not correct')
    })

    pickTeamPage.getAvailableTeams().count().then((nrteams) => {
        expect(nrteams).toBe(noAvailable, 'On Choose-teams page there was not only one team displayed')
    })
}
