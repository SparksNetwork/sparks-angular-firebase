import { OpportunityPage } from "../../../po/opp.partial-discount.po";
import { browser, ExpectedConditions } from "protractor/built";
const waitTimeout = 5000;
function testTitle(page: OpportunityPage, opp: any) {
    let titleElement = page.getTitleElement();
    browser.wait(ExpectedConditions.presenceOf(titleElement),
        waitTimeout, 'Opportunity title was not present')
    titleElement.getText().then(function (str) { expect(str).toMatch(opp['title']) });
}