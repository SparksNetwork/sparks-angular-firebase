import 'jasmine'
import { OpportunityPage } from '../../../po/opp.partial-discount.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { confirmPage, WAIT_TIMEOUT } from '../shared';
import { BenefitSegment } from '../../../po/apply.benefit.segment';

function testTitle(page: OpportunityPage, opp: any) {
    let titleElement = page.getTitleElement();
    browser.wait(ExpectedConditions.presenceOf(titleElement),
        WAIT_TIMEOUT, 'On Opportunity page the title was not present')
    return titleElement.getText().then(function (str) {
        expect(str).toMatch(opp['title'],
            'On Opportunity page the title was not correct')
    });
}

function testDiscountValue(page: OpportunityPage, opp: any) {
    let discountElement = page.getDiscountElement();
    browser.wait(ExpectedConditions.presenceOf(discountElement),
        WAIT_TIMEOUT, 'On Opportunity page the discount value was not present')
    let discountValue: number;
    discountValue = ((opp['benefitValue'] - opp['contribValue']) / (opp['benefitValue'])) * 100;
    discountValue = Math.trunc(discountValue);
    return discountElement.getText().then(function (str) {
        expect(str).toContain(discountValue.toString(),
            'On Opportunity page the discount value was not computed correctly')
    });
}

function testBenefitAndContribValue(page: OpportunityPage, opp: any) {
    let benefitElement = page.getBenefitContribElement();
    browser.wait(ExpectedConditions.presenceOf(benefitElement),
        WAIT_TIMEOUT, 'On Opportunity page the benefit was not present')
    benefitElement.getText().then(function (str)
    { expect(str).toContain(opp['benefitValue'], 'On Opportunity page the benefit value was not corect') });
    return benefitElement.getText().then(function (str)
    { expect(str).toContain(opp['contribValue'], 'On Opportunity page the contrib value was not corect') });

}

export function testKarmaPoints(page: BenefitSegment, opp: any) {
    let receivedKarmaPointsElement = page.getReceivedKarmaPointsElement();
    browser.wait(ExpectedConditions.presenceOf(receivedKarmaPointsElement),
        WAIT_TIMEOUT, 'On Opportunity page the received karma points were not present')
    return receivedKarmaPointsElement.getText().then(function (str) {
        expect(str).toContain(opp['karma'],
            'On Opportunity page the received karma points were not correct displayed')
    });
}

export function testCommunityBenefit(page: BenefitSegment, fullyLoaded: any) {
    let communityElement = page.getCommunityBenefitElement();
    browser.wait(ExpectedConditions.presenceOf(communityElement),
        WAIT_TIMEOUT, 'On Opportunity page the community benefit was not present')
    return communityElement.getText().then(function (str) {
        expect(str).toMatch(fullyLoaded['project']['LC']['communityBenefit'],
            'On Opportunity page the community benefit was not correct')
    });
}

export function testBenefit(page: BenefitSegment, fullyLoaded: any) {
    const benefitElement = page.getBenefitElement();
    browser.wait(ExpectedConditions.presenceOf(benefitElement),
        WAIT_TIMEOUT, 'On Opportunity page the benefit was not present')
    page.getBenefitTitle().then(function (str) {
        expect(str).toContain(fullyLoaded['benefit']['LC1-1']['title'],
            'On Opportunity page benefit title was not correct')
    });
    return page.getBenefitDescription().then(function (str) {
        expect(str).toContain(fullyLoaded['benefit']['LC1-1']['description'],
            'On Opportunity page benefit description was not correct')
    });
}

function testContribution(page: OpportunityPage, fullyLoaded: any) {
    const contribElement = page.getContribElement();
    browser.wait(ExpectedConditions.presenceOf(contribElement),
        WAIT_TIMEOUT, 'On Opportunity page the contribution was not present')

    let contribTitle = page.getContribTitle();
    contribTitle.then(function (str) {
        expect(str).toContain(fullyLoaded['contrib']['LC1-1']['title'],
            'On Opportunity page the benefit title was not correct')
    });
    contribTitle.then(function (str) {
        expect(str).toContain(fullyLoaded['contrib']['LC1-1']['count'],
            'On Opportunity page the benefit title was not complete')
    });

    let contribDescription = page.getContribDescription();
    contribDescription.then(function (str) {
        expect(str).toContain(fullyLoaded['contrib']['LC1-1']['shiftMinLength'],
            'On Opportunity page minimum value of shift was not present')
    });

    return contribDescription.then(function (str) {
        expect(str).toContain(fullyLoaded['contrib']['LC1-1']['shiftMaxLength'],
            'On Opportunity page, maximum value of shift was not present')
    });

}

function testHideTeams(page: OpportunityPage) {

    let expandLink = page.getExtendElement();
    browser.wait(ExpectedConditions.presenceOf(expandLink),
        WAIT_TIMEOUT, 'On Opportunity page the expand link was not present')

    let hiddenTeams = page.getHiddenTeams();

    hiddenTeams.count().then(function (str) {
        if (str > 0) {
            hiddenTeams.each(function (element) {
                browser.wait(ExpectedConditions.invisibilityOf(element),
                    WAIT_TIMEOUT, 'On Opportunity page the teams were hidden when they should be visible')
            });
        }
    })

    expandLink.click();

    hiddenTeams.count().then(function (str) {
        if (str > 0) {
            hiddenTeams.each(function (element) {
                browser.wait(ExpectedConditions.visibilityOf(element),
                    WAIT_TIMEOUT, 'On Opportunity page the teams were not hidden when they should be visible')
            });
        }
    })

    const collapseLink = page.getCollapseLink()
    browser.wait(ExpectedConditions.presenceOf(collapseLink),
        WAIT_TIMEOUT, 'On Opportunity page the collapse link was not present')

    collapseLink.click();
    return hiddenTeams.count().then(function (str) {
        if (str > 0) {
            hiddenTeams.each(function (element) {
                browser.wait(ExpectedConditions.invisibilityOf(element),
                    WAIT_TIMEOUT, 'On Opportunity page the team were not hidden back')
            });
        }
    })

}

function testChangeDiscountValue(page: OpportunityPage, fullyLoaded: any) {

    let discountElement = page.getDiscountElement();
    browser.wait(ExpectedConditions.presenceOf(discountElement),
        WAIT_TIMEOUT, 'On Opportunity page discount value was not present')

    discountElement.click();

    let discountSecondValue = page.getSecondDiscount()
    browser.wait(ExpectedConditions.presenceOf(discountSecondValue),
        WAIT_TIMEOUT, 'On Opportunity page the second discount value was not present')

    let discountValue: number;
    let secondOpp = fullyLoaded['opp']['LC2']
    discountValue = ((secondOpp['benefitValue'] - secondOpp['contribValue']) / (secondOpp['benefitValue'])) * 100;
    discountValue = Math.trunc(discountValue);
    discountSecondValue.getText().then(function (str) {
        expect(str).toContain(discountValue.toString(),
            'On Opportunity page the discount value was not correct')
    });

    discountSecondValue.click();

    confirmPage('project/LC/opp/LC2', '', 'Oportunity-second-discount-value', 'first', WAIT_TIMEOUT)

    let titleElement = page.getTitleElement();
    browser.wait(ExpectedConditions.presenceOf(titleElement),
        WAIT_TIMEOUT, 'On Second Opportunity page title was not present')
    titleElement.getText().then(function (str) {
        expect(str).toMatch(secondOpp['title'],
            'On Second Opportunity page the title was not present')
    });

    //return to first opportunity
    return page.navigateTo()
        .then(() =>
            confirmPage('project/LC/opp/LC1', '', 'Oportunity-first-discount-value', 'first', WAIT_TIMEOUT))

}

export function testsForOpportunityPage(page: OpportunityPage, fullyLoaded: any, opp: any) {
    return testTitle(page, opp)
        .then(() => testBenefit(page, fullyLoaded))
        .then(() => testBenefitAndContribValue(page, opp))
        .then(() => testChangeDiscountValue(page, fullyLoaded))
        .then(() => testContribution(page, fullyLoaded))
        .then(() => testDiscountValue(page, opp))
        .then(() => testHideTeams(page))
        .then(() => testKarmaPoints(page, opp))

}

