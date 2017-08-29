import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { setData, setUsers } from '../../firebase';
import { OpportunityFullDiscountPage } from '../../po/opp.full-discount.po';

const waitTimeout = 5000;

describe('Opportunity: volunteer obtains a partial discount', () => {
    let page: OpportunityFullDiscountPage;
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const opp = fullyLoaded['opp']['LC3']

    beforeAll(done => {
        page = new OpportunityFullDiscountPage();
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
            .then(() => page.navigateTo())
            .then(done)
    });

    describe('Exploring the opportunity page', () => {
        it('Title should be ' + opp['title'], () => {
            let titleElement = page.getTitleElement();
            browser.wait(ExpectedConditions.presenceOf(titleElement),
                waitTimeout, 'Opportunity title was not present')
            titleElement.getText().then(function (str) { expect(str).toMatch(opp['title']) });
        })

        it('It should display the discount value', () => {
            let discountElement = page.getDiscountElement();
            browser.wait(ExpectedConditions.presenceOf(discountElement),
                waitTimeout, 'Discount value was not present')
            let discountValue: number;
            discountValue = ((opp['benefitValue'] - opp['contribValue']) / (opp['benefitValue'])) * 100;
            discountValue = Math.trunc(discountValue);
            discountElement.getText().then(function (str) { expect(str).toContain(discountValue.toString()) });
        })

        it('Community benefit should be: ' + fullyLoaded['project']['LC']['communityBenefit'], () => {
            let communityElement = page.getCommunityBenefitElement();
            browser.wait(ExpectedConditions.presenceOf(communityElement),
                waitTimeout, 'Community benefit was not present')
            communityElement.getText().then(function (str)
            { expect(str).toMatch(fullyLoaded['project']['LC']['communityBenefit']) });
        })


        it('It should display the karma points that the volunteer will receive', () => {
            let receivedKarmaPointsElement = page.getReceivedKarmaPointsElement();
            browser.wait(ExpectedConditions.presenceOf(receivedKarmaPointsElement),
                waitTimeout, 'Received karma points were not present')
            receivedKarmaPointsElement.getText().then(function (str)
            { expect(str).toContain(opp['karma']) });
        })

        it('It should display the benefits', function () {
            const benefitElement = page.getBenefitElement();
            browser.wait(ExpectedConditions.presenceOf(benefitElement),
                waitTimeout, 'The benefit was not present')
            page.getBenefitTitle().then(function (str)
            { expect(str).toContain(fullyLoaded['benefit']['LC1-1']['title'], 'Benefit title was not correct') });
            page.getBenefitDescription().then(function (str)
            { expect(str).toContain(fullyLoaded['benefit']['LC1-1']['description'], 'Benefit description was not correct') });
        });

        it('It should display the volunteer contribution', function () {
            const contribElement = page.getContribElement();
            browser.wait(ExpectedConditions.presenceOf(contribElement),
                waitTimeout, 'The contribution was not present')

            let contribTitle = page.getContribTitle();
            contribTitle.then(function (str)
            { expect(str).toContain(fullyLoaded['contrib']['LC3-1']['title'], 'Benefit title was not correct') });
            contribTitle.then(function (str)
            { expect(str).toContain(fullyLoaded['contrib']['LC3-1']['count'], 'Benefit title was not complete') });

            let contribDescription = page.getContribDescription();
            contribDescription.then(function (str)
            { expect(str).toContain(fullyLoaded['contrib']['LC3-1']['shiftMinLength'], 'Minimum value of shift was not present') });

            contribDescription.then(function (str)
            { expect(str).toContain(fullyLoaded['contrib']['LC3-1']['shiftMaxLength'], 'Maximum value of shift was not present') });

        });

    })


    describe('Info about the available teams', () => {

        it('It should display the title of the first team', () => {
            let firstTeam = page.getFirstTeam()
            browser.wait(ExpectedConditions.presenceOf(firstTeam),
                waitTimeout, 'The first team was not present')

            firstTeam.getText().then(function (str)
            { expect(str).toContain(fullyLoaded['oppAllowedTeam']['LC3-LC9']['team']['title']) });
        })

    })

    describe('Changing the discount value', () => {
        it('Changing the value of the discount should open a new oppportunity page', () => {

            let discountElement = page.getDiscountElement();
            browser.wait(ExpectedConditions.presenceOf(discountElement),
                waitTimeout, 'Discount value was not present')

            discountElement.click();

            let discountSecondValue = page.getSecondDiscount()
            browser.wait(ExpectedConditions.presenceOf(discountSecondValue),
                waitTimeout, 'The second discount value was not present')

            let discountValue: number;
            let secondOpp = fullyLoaded['opp']['LC2']
            discountValue = ((secondOpp['benefitValue'] - secondOpp['contribValue']) / (secondOpp['benefitValue'])) * 100;
            discountValue = Math.trunc(discountValue);
            discountSecondValue.getText().then(function (str)
            { expect(str).toContain(discountValue.toString(), 'The discount value was not correct') });

            discountSecondValue.click();

            browser.wait(ExpectedConditions.urlContains('project/LC/opp/LC2'),
                waitTimeout, 'The link to second aopportunity was not correct')

            let titleElement = page.getTitleElement();
            browser.wait(ExpectedConditions.presenceOf(titleElement),
                waitTimeout, 'Opportunity title was not present')
            titleElement.getText().then(function (str) { expect(str).toMatch(secondOpp['title']) });

            //return to first opportunity
            page.navigateTo();
        })


    })

})