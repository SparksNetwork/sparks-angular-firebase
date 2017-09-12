import { browser, by, element } from 'protractor';

export class AnswerTeamQuestionPage {

    getJoinTeamButton() {
        return element(by.css('div.bottom-nav button'))
    }

    getPreviousButton() {
        return element(by.css('div.bottom-nav a'))
    }

    getAnswer() {
        return element(by.css('textarea'))
    }

    getQuestion() {
        return element(by.className('segment no-brd')).element(by.className('card-text'))
    }


}