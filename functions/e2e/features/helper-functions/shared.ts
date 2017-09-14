import { browser, ExpectedConditions } from 'protractor';

export function GetKeyFromUrl(url: string, tokenIndex: number) {
    let splittedUrl = url.split('/');
    return splittedUrl[splittedUrl.length - tokenIndex];
}

export function confirmPage(firstPartToContain: string, secondPartToContain: string,
    pageName: string, timeToVisit: string, waitTimeout: number, notToContain?: string) {

    let messageForFail: string = 'User was not taken to ' + pageName + ' page ' +
        'when visiting the page for the ' + timeToVisit + ' time'

    if (notToContain) {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains(firstPartToContain),
            ExpectedConditions.urlContains(secondPartToContain),
            ExpectedConditions.not(ExpectedConditions.urlContains(notToContain))),
            waitTimeout, messageForFail)
    } else {
        return browser.wait(ExpectedConditions.and(
            ExpectedConditions.urlContains(firstPartToContain),
            ExpectedConditions.urlContains(secondPartToContain)),
            waitTimeout, messageForFail)
    }
}