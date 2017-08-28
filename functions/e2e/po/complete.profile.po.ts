import { browser, by, element } from 'protractor';

export class CompleteProfilePage {

    getLegalNameInput() {
        return element(by.id('legalName'));
    }

    getPreferredNameInput() {
        return element(by.id('preferredName'));
    }

    getPhoneNumberInput() {
        return element(by.id('phoneNumber'));
    }

    getBirthdayInput() {
        return element(by.id('birthday'));
    }

    getNextButton() {
        return element(by.id('next'));
    }

}
