import { ProjectPage } from "./project.po";
import { browser } from "protractor/built";

var firebaseAccessHandler = require('../setup/firebaseAccess');

describe("Project LC tests", () => {
    let page: ProjectPage;

    beforeAll(() => {
        firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/LCOriginal.json', "project");
        firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/LCOriginalOpp.json', "opp");

    });

    afterAll(() => {
        firebaseAccessHandler.deleteItemByKey("project", "LCTest");
        firebaseAccessHandler.deleteItemByKey("opp", "LCTest1");
        firebaseAccessHandler.deleteItemByKey("opp", "LCTest2");
        firebaseAccessHandler.deleteItemByKey("opp", "LCTest3");
        firebaseAccessHandler.deleteItemByKey("opp", "LCTest4");
        firebaseAccessHandler.deleteItemByKey("opp", "LCTest5");

    });

    beforeEach(() => {
        page = new ProjectPage();
    });

    it('Title shoudld be `Lucidity Crossroads`', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getProjectTitle().then(function (str) { expect(str).toBe("Lucidity Crossroads") });

    });

    it('Navbar-Brand link should be `sparks.network`', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getNavbarBrandLink().then(function (str) { expect(str).toBe("sparks.network") });

    });

    it('Carousel last indicator should display the image:https://placeimg.com/1140/410/animals/grayscale', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        let lastCarouselIndicator = page.getLastCarouselIndicator();
        lastCarouselIndicator.click();
        page.getCarouselActiveImageDiv().getAttribute('style')
            .then(function (str) { expect(str).toContain('https://placeimg.com/1140/410/animals/grayscale') });

    });

    it('It should display 5 oportunity links', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getNumberOfOportunityLinks().then(function (str) { expect(str).toBe(5) });

    });

    it('It should display an specific icon for each oportunity ', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getFirstOportunitySpan().getAttribute('class')
            .then(function (str) { expect(str).toContain('glyphicon-music') });

        page.getSecondOportunitySpan().getAttribute('class')
            .then(function (str) { expect(str).toContain("glyphicon-glass") });
            
        page.getThirdOportunitySpan().getAttribute('class')
            .then(function (str) { expect(str).toContain("glyphicon-film") });
            
        page.getFourthOportunitySpan().getAttribute('class')
            .then(function (str) { expect(str).toContain("glyphicon-camera") });
            
        page.getFifthOportunitySpan().getAttribute('class')
            .then(function (str) { expect(str).toContain("glyphicon-cog") });
    });

    it('First oportunity should have the title: 1-Shift $209', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getFirstOportunityTitle()
            .then(function (str) { expect(str).toEqual('1-Shift $209') });
    });

    it('First oportunity should have the contribution value: $374 in value', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getFirstOportunityContribValue()
            .then(function (str) { expect(str).toEqual('$374 in value') });
    });

    it('First oportunity should have a 44% discount', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getFirstOportunityDiscount()
            .then(function (str) { expect(str).toEqual('44% discount') });
    });

    it('Third oportunity should have the title: Pre-Event Weekends', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getThirdOportunityTitle()
            .then(function (str) { expect(str).toEqual('Pre-Event Weekends') });
    });

    it('Third oportunity should have the contribution value: $364 in value', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getThirdOportunityContribValue()
            .then(function (str) { expect(str).toEqual('$364 in value') });
    });


});