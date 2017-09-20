import 'jasmine'
import { ProjectSingleOppPage } from '../../../po/project.single-opp.po';
import { browser, ExpectedConditions } from 'protractor/built';
const waitTimeout = 5000

function testBenefit(page: ProjectSingleOppPage, fullyLoaded: any, benefitKey: string) {

    const benefitElement = page.getReceivedKarmaPointsElement();
    browser.wait(ExpectedConditions.presenceOf(benefitElement), waitTimeout,
        'On Project-Single-opportunity page the benefit was not present')

    page.getBenefitTitle().then(function (str) {
        expect(str).toContain(fullyLoaded['benefit'][benefitKey]['title'],
            'On Project-Single-opportunity page the benefit title was not correct')
    });
    return page.getBenefitDescription().then(function (str) {
        expect(str).toContain(fullyLoaded['benefit'][benefitKey]['description'],
            'On Project-Single-opportunity page the benefit description was not correct')
    });

}

function testContribution(page: ProjectSingleOppPage) {
    const contribElement = page.getContribElement();
    return browser.wait(ExpectedConditions.presenceOf(contribElement),
        waitTimeout, 'On Project-Single-opportunity page the contribution was not present')

}

export function testProjectSingleOpp(page: ProjectSingleOppPage, fullyLoaded: any, benefitKey: string) {
    return testBenefit(page, fullyLoaded, benefitKey)
        .then(() => testContribution(page))
}