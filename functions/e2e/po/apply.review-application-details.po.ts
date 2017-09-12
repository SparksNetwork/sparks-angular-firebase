import { browser, by, element, ElementFinder } from 'protractor';

export class ReviewApplicationDetailsPage {

    getNextButton() {
        return element(by.css('div.bottom-nav button'))
    }

    getPreviousButton() {
        return element(by.css('div.bottom-nav a'))
    }

    getVolunteerDetailsEditLink() {
        return element(by.css('apply-review-profile a'))
    }

    getLegalName() {
        return element.all(by.css('apply-review-profile div.col-xs-12 div.col-xs-5 ')).first()
    }

    getPreferredName() {
        return element.all(by.css('apply-review-profile div.col-xs-12 div.col-xs-5 ')).get(1)
    }

    getPhoneNumber() {
        return element.all(by.css('apply-review-profile div.col-xs-12 div.col-xs-5 ')).get(2)
    }

    getBirthday() {
        return element.all(by.css('apply-review-profile div.col-xs-12 div.col-xs-5 ')).get(3)
    }

    getOrganizerQuestionExapandLink() {
        return element.all(by.css('h3.collapse-title')).get(0)
    }

    getOrganizerQuestion() {
        return element(by.id('organizer-question')).element(by.css('p.card-text'))
    }

    getOrganizerQuestionAnswer() {
        return element(by.css('textarea'))
    }

    getOrganizerQuestionEditLink() {
        return element.all(by.css('div.collapse-link')).get(0).element(by.css('a'))
    }

    getSelectedTeamsExapandLink() {
        return element.all(by.css('h3.collapse-title')).get(1)
    }

    getSelectedTeamsEditLink() {
        return element.all(by.css('div.collapse-link')).get(1).element(by.css('a'))
    }

    getSelectedTeams() {
        return element.all(by.className('selected-team-item'))
    }

    getSelectedTeamTitle(teamItem: ElementFinder) {
        return teamItem.element(by.css('h4'))
    }

}