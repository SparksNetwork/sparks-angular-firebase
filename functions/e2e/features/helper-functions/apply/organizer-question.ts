import 'jasmine'
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { ExpectedConditions, browser } from 'protractor/built';
import { GetKeyFromUrl } from '../shared';

const waitTimeout = 5000

function testQuestion(page: AnswerOrganizerQuestionPage, fullyLoaded: any) {

    let question = page.getQuestion()
    browser.wait(ExpectedConditions.presenceOf(question),
        waitTimeout, 'On Answer-organizer-question page the text of the question was not present')
    return question.getText()
        .then((str) => {
            return browser.getCurrentUrl().then((url) => {
                let oppKey: string = GetKeyFromUrl(url, 4)
                expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                    'On Answer-organizer-question page the text of the question was not correct')
            })
        })
}

export function testsForOnAnswerOrganizerQuestionPage(page: AnswerOrganizerQuestionPage, fullyLoaded: any) {
    return testQuestion(page, fullyLoaded)
}