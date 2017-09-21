import { browser, ExpectedConditions } from 'protractor';
import { PickTeamPage } from '../../po/apply.choose.team.po';
import { AnswerTeamQuestionPage } from '../../po/apply.answer-team-question.po';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

export const WAIT_TIMEOUT = 7000;

export function getDateIntervalForShift(start: string, end: string): string {
    const startDateTime = moment(new Date(start));
    const endDateTime = moment(new Date(end));

    let dateFormatPipe: DateFormatPipe = new DateFormatPipe()

    const now = moment(new Date());

    let dateString = dateFormatPipe.transform(startDateTime, 'MMM Do');

    if (startDateTime.year() !== now.year()) {
        dateString += (', ' + startDateTime.year());
    }

    dateString += (' ' + dateFormatPipe.transform(startDateTime, 'h:mm a'));

    if (endDateTime.isValid()) {
        if (endDateTime.date() === startDateTime.date()) {
            dateString += (' - ' + dateFormatPipe.transform(endDateTime, 'h:mm a'));
        } else {
            dateString += (' - ' + dateFormatPipe.transform(endDateTime, 'MMM Do'));
            if (endDateTime.year() !== startDateTime.year()) {
                dateString += (', ' + endDateTime.year());
            }
            dateString += (' ' + dateFormatPipe.transform(endDateTime, 'h:mm a'));
        }
    }

    return dateString.toLowerCase();
}

export function GetKeyFromUrl(url: string, tokenIndex: number) {
    let splittedUrl = url.split('/');
    return splittedUrl[splittedUrl.length - tokenIndex];
}

export function confirmPage(firstPartToContain: string, secondPartToContain: string,
    pageName: string, timeToVisit: string, notToContain?: string) {

    let messageForFail: string = 'User was not taken to ' + pageName + ' page ' +
        'when visiting the page for the ' + timeToVisit + ' time'

    if (notToContain) {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains(firstPartToContain),
            ExpectedConditions.urlContains(secondPartToContain),
            ExpectedConditions.not(ExpectedConditions.urlContains(notToContain))),
            WAIT_TIMEOUT, messageForFail)
    } else {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains(firstPartToContain),
            ExpectedConditions.urlContains(secondPartToContain)),
            WAIT_TIMEOUT, messageForFail)
    }
}


export function joinATeam(pickTeamPage: PickTeamPage,
    oppKey: string, answerTeamQuestionPage: AnswerTeamQuestionPage) {

    return confirmPage('/apply/' + oppKey, '/teams', 'Pick-teams', 'first', '/teams/')
        .then(() => {
            //the available team is displayed
            let team = pickTeamPage.getAvailableTeamLink(0)
            browser.wait(ExpectedConditions.presenceOf(team),
                WAIT_TIMEOUT, 'The first team was not present')

            //user clicks on the team
            return pickTeamPage.getAvailableTeamTitle(team).click()
        })
        .then(() => confirmPage('/apply/' + oppKey, '/teams/', 'Answer-team-question', 'first'))
        .then(() => {

            //answer Team-question 
            let answer = answerTeamQuestionPage.getAnswer()
            browser.wait(ExpectedConditions.presenceOf(answer),
                WAIT_TIMEOUT, 'The input for answer team question was not present')
            answerTeamQuestionPage.getAnswer().sendKeys('Answer is always 42')
            //press join 
            let joinButton = answerTeamQuestionPage.getJoinTeamButton()
            browser.wait(ExpectedConditions.elementToBeClickable(joinButton), WAIT_TIMEOUT,
                'Join button was not clickable')
            return joinButton.click()
        })
        .then(() =>
            confirmPage('/apply/' + oppKey, '/teams', 'Pick-teams', 'first', '/teams/'))
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

export function TestsForSelectedAndAvailableTeams(pickTeamPage: PickTeamPage, noSelected: number, noAvailable: number) {
    let availableTeam = pickTeamPage.getAvailableTeamLink(0)
    browser.wait(ExpectedConditions.presenceOf(availableTeam),
        WAIT_TIMEOUT, 'On Choose-teams page the available team was not present')

    pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
        expect(teamsNo).toBe(noSelected, 'On Choose-teams page the number of selected teams was not correct')
    })

    pickTeamPage.getAvailableTeams().count().then((nrteams) => {
        expect(nrteams).toBe(noAvailable, 'On Choose-teams page there was not only one team displayed')
    })
}

