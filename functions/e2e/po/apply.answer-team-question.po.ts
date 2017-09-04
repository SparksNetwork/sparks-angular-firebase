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
        return element.all(by.className('row')).get(2).element(by.className('card-text'))
    }


}