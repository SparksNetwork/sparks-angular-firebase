import { browser, by, element } from 'protractor';

export class ReviewApplicationDetailsEditAnswerPage {

    getSaveButton() {
        return element(by.css('div.bottom-nav button'))
    }

    getQuestion() {
        return element(by.css('form div.segment.no-brd p.card-text'))
    }

    getAnswer() {
        return element(by.css('textarea'))
    }

}