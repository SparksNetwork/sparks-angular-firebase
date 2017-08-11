import { browser, by, element } from 'protractor';

export class ProjectSingleOppPage {

    navigateTo() {
        return browser.get('/project/KPCTest');
    }

    getProjectTitle() {
        return element(by.css('h1.event-title')).getText();
    }

    getDescriptionText() {
        return element(by.className('event-description segment')).$('p').getText();
    }

}