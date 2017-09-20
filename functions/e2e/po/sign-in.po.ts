import { element, by } from "protractor/built";

export class SignInPage {

    getEmailAddressInput() {
        return element(by.id('email'))
    }

    getPasswordInput() {
        return element(by.id('password'))
    }

    getSignInButton() {
        return element(by.id('signin'))
    }
} 