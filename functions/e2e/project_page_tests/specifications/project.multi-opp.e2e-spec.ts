import { browser } from "protractor/built";
import { ProjectMultiOppPage } from "../pages/project.multi-opp.po";

var firebaseAccessHandler = require('../../setup/firebaseAccess');

describe("[ProjectPage] Project with multiple oportunities", () => {
    let page: ProjectMultiOppPage;

    beforeAll(() => {
        firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/LCTest.json', "project");
        firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/LCTestOpp.json', "opp");

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
        page = new ProjectMultiOppPage();
    });

    it('Title should be `Lucidity Crossroads`', function () {

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

    it('It should display a specific icon for each oportunity ', function () {

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

    it('First oportunity should have the contribution value: 209', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getFirstOportunityTitle()
            .then(function (str) { expect(str).toContain('209') });
    });

    it('First oportunity should have the benefit value: 374', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getFirstOportunityContribValue()
            .then(function (str) { expect(str).toContain('374') });
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

    it('Third oportunity should have the contribution value: 364', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getThirdOportunityContribValue()
            .then(function (str) { expect(str).toContain('364') });
    });

    it('The description should be: Hello my magical unicorns! Come work and play with us at '
    +'Lucidity Festival this year by joining the Dream Makers! ', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getDescriptionText()
            .then(function (str) { expect(str).toMatch('Hello my magical unicorns! '
             +'Come work and play with us at Lucidity Festival this year by joining the Dream Makers!') });
    });

    it('Location link should open in a new tab Google Maps directions for reaching Santa Barbara', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        let locationLink = page.getLocationLink();

        let hrefAttribute = locationLink.getAttribute('href');

        //check to see if the latitude and longitude are taken from firebase
        hrefAttribute.then(function (str)
        { expect(str).toContain('-119.878357', "The longitude was not correct") });;
        hrefAttribute.then(function (str) 
        { expect(str).toContain('34.545587',"The latitude was not correct") });;

        //check to see if one point is the user location
        hrefAttribute.then(function (str) 
        { expect(str).toContain('My',"The user location was not present") });;
        hrefAttribute.then(function (str) 
        { expect(str).toContain('Location',"The user location was not present") });;

        locationLink.click().then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                let newWindowHandle = handles[1]; // this is the new window

                browser.switchTo().window(newWindowHandle).then(function () {
                    expect(browser.getCurrentUrl()).toEqual(hrefAttribute,"The link did not open");
                });
                browser.close();
                browser.switchTo().window(handles[0]);
            });
        });
    });

    it('It should display:location name, city and state', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        let locationName = page.getLocationName();
        locationName.then(function (str)
        { expect(str).toContain('Santa Barbara', "City was not correct") });
        locationName.then(function (str)
        { expect(str).toContain("Live Oak Campground", "Location name was not correct") });
        locationName.then(function (str)
        { expect(str).toContain('CA', "State was not correct") });
    });

    it('Time interval should be: Feb 2 - Apr 13', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getDate().then(function (str) { expect(str).toMatch("Feb 2 - Apr 13") });

    });

    it('It should display maximum karma points', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getMaximumKarmaPoints().then(function (str) { expect(str).toContain("1519") });

    });

    it('It should display the karma points received if the user shares the event', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getShareKarmaPoints().then(function (str) { expect(str).toContain("100") });

    });

    it('It should display a link to Event Page', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        let eventPageLink = page.getLinkToEventPage();
        let hrefAttribute = eventPageLink.getAttribute('href');

        hrefAttribute.then(function (str)
        { expect(str).toMatch("http://2017.lucidityfestival.com/", "The link was not correct") });

        eventPageLink.click().then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                let newWindowHandle = handles[1]; // this is the new window

                browser.switchTo().window(newWindowHandle).then(function () {
                    expect(browser.getCurrentUrl()).toEqual(hrefAttribute, "The link did not open");
                });
                browser.close();
                browser.switchTo().window(handles[0]);
            });
        });       
    });

    it('It should display a link to ask the organizer', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getAskOrganizerLinkText().then(function (str) { expect(str).toContain("Ask The Organizer") });

    });

    it('It should display: name and organization for the organizer', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        let organizerDetails =page.getOrganizerDetails();


        organizerDetails.then(function (str) 
        { expect(str).toContain("Princess","Name was not correctly displayed") });
        organizerDetails.then(function (str) 
        { expect(str).toContain("Lucidity Festival","Organization was not correctly displayed") });

    });
        it('It should display the image of the organizer', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);

        page.getOrganizerImage().getAttribute('src').then(function (str) 
        { expect(str).toMatch("https://placeimg.com/40/40/people/grayscale") });


    });


});