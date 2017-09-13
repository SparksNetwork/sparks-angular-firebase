import { ProjectMultiOppPage } from "../../../po/project.multi-opp.po";
import { browser, ExpectedConditions } from "protractor/built";
import { GetKeyFromUrl } from "../shared";
const waitTimeout = 5000

function testOpportunities(page: ProjectMultiOppPage, fullyLoaded: any) {
    let oppLinks = page.getLinks()
    browser.wait(ExpectedConditions.presenceOf(oppLinks.first()),
        waitTimeout, 'First opportunity link was not present')

    return oppLinks.each(function (item) {
        item.getAttribute('href').then((link) => {
            page.getTitle(item).getText().then((title) => {
                expect(title).toMatch(fullyLoaded['opp'][GetKeyFromUrl(link, 1)]['title'], 'Opportunity title was not correct')
            })

        })
    })
}

export function testProjectMultipleOpp(page: ProjectMultiOppPage, fullyLoaded: any) {
    return testOpportunities(page, fullyLoaded)
}