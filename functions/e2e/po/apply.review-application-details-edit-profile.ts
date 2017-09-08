import { browser, by, element, ElementFinder } from 'protractor';

export class ReviewApplicationDetailsEditProfilePage {

    getSaveButton() {
        return element(by.css('div.bottom-nav button'))
    }

    getLegalName() {
        return element(by.id('legalName'))
    }

    getPreferredName() {
        return element(by.id('preferredName'))
    }

    getPhoneNumber() {
        return element(by.id('phoneNumber'))
    }

    getBirthday() {
        return element(by.id('birthday'))
    }

}