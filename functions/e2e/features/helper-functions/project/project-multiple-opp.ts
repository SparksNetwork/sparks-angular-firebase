import 'jasmine'
import { ProjectMultiOppPage } from '../../../po/project.multi-opp.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { GetKeyFromUrl } from '../shared';
const waitTimeout = 5000

function testOpportunities(page: ProjectMultiOppPage, fullyLoaded: any) {
    let oppLinks = page.getLinks()
    browser.wait(ExpectedConditions.presenceOf(oppLinks.first()),
        waitTimeout, 'On Project-Multiple-opportunity page first opportunity link was not present')
    page.getNumberOfOportunityLinks()
        .then(function (str) {
            expect(str).toBe(5,
                'On Project-Multiple-opportunity page the number of opportunity links was not correct')
        });
    return oppLinks.each(function (item) {
        item.getAttribute('href').then((link) => {
            page.getTitle(item).getText().then((title) => {
                expect(title).toMatch(fullyLoaded['opp'][GetKeyFromUrl(link, 1)]['title'],
                    'On Project-Multiple-opportunity page the opportunity title was not correct')
            })
            page.getBenefitValue(item).getText().then((benefit) => {
                expect(benefit).toContain(fullyLoaded['opp'][GetKeyFromUrl(link, 1)]['benefitValue'],
                    'On Project-Multiple-opportunity page the benefit value was not displayed correcty')
            })

            let discountValue = ((fullyLoaded['opp'][GetKeyFromUrl(link, 1)]['benefitValue']
                - fullyLoaded['opp'][GetKeyFromUrl(link, 1)]['contribValue']) / (fullyLoaded['opp'][GetKeyFromUrl(link, 1)]['benefitValue'])) * 100;
            discountValue = Math.trunc(discountValue);
            if (discountValue != 100) {
                browser.wait(ExpectedConditions.presenceOf(page.getDiscount(item)), waitTimeout,
                    'On Project-multiple-opportunity page the discount was not present')
            }

        })
    })
}


export function testProjectMultipleOpp(page: ProjectMultiOppPage, fullyLoaded: any) {
    return testOpportunities(page, fullyLoaded)

}