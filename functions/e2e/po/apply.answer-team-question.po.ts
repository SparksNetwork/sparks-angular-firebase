import { browser, by, element } from 'protractor';

export class AnswerTeamQuestion {

    getJoinTeamButton() {
        return element.all(by.className('btn btn-block btn-default')).get(1)
    }

    getPreviousButton() {
        return element.all(by.className('btn btn-block btn-default')).first()
    }

    getAnswer() {
        return element(by.css('textarea'))
    }

    getQuestion() {
        return element.all(by.className('card-text')).get(1)
    }


}