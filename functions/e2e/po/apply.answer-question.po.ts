import { browser, by, element } from 'protractor';

export class AnswerQuestionPage {

    getNextButton() {
        return element(by.className('btn btn-block btn-default'))
    }

    getAnswer() {
        return element(by.css('textarea'))
    }

    getQuestion() {
        return element(by.className('card-text'))
    }
}