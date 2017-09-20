import { browser, by, element } from 'protractor';

export class AnswerOrganizerQuestionPage {


    getNextButton(){
        return element(by.css('div.bottom-nav button'))
    }

    getAnswer(){
        return element(by.css('textarea'))
    }

    getQuestion(){
        return element(by.css('form div.segment.no-brd p.card-text'))
    }
    
}