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
        return element.all(by.css('h3.segment-title')).get(1)
    }

    getOrganizerQuestion() {
        return element(by.id('organizer-question')).element(by.css('p.card-text'))
    }

    getOrganizerQuestionAnswer() {
        return element(by.css('div.edit-profile-detalils p'))
    }

    getOrganizerQuestionEditLink() {
        return element(by.id('organizer-question')).element(by.css('a'))
    }

    getSelectedTeamsExapandLink() {
        return element.all(by.css('h3.segment-title')).get(2)
    }

    getSelectedTeamsEditLink() {
        return element(by.id('selected-teams')).element(by.css('a'))
    }

    getSelectedTeams() {
        return element.all(by.className('selected-team-item'))
    }

    getSelectedTeamTitle(teamItem: ElementFinder) {
        return teamItem.element(by.css('h4'))
    }

}