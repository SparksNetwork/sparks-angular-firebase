import 'jasmine'
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { ExpectedConditions, browser } from 'protractor/built';
import { GetKeyFromUrl, WAIT_TIMEOUT } from '../shared';


function testQuestion(page: AnswerOrganizerQuestionPage, fullyLoaded: any, oppKey: string) {

    let question = page.getQuestion()
    browser.wait(ExpectedConditions.presenceOf(question),
        WAIT_TIMEOUT, 'On Answer-organizer-question page the text of the question was not present')
    return question.getText()
        .then((str) => {

            expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                'On Answer-organizer-question page the text of the question was not correct')

        })
}

export function testsForAnswerOrganizerQuestionPage(page: AnswerOrganizerQuestionPage, fullyLoaded: any, oppKey: string) {
    return testQuestion(page, fullyLoaded, oppKey)
}