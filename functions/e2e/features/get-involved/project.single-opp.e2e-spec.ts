import 'jasmine'
import { browser, ExpectedConditions } from "protractor/built";
import { setData, setUsers } from "../../firebase";
import { ProjectSingleOppPage } from "../../po/project.single-opp.po";

const waitTimeout = 5000;

describe("[ProjectPage] Project with a single oportunity", () => {
    let page: ProjectSingleOppPage;
    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeEach(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
            .then(done)
    })


    beforeEach(() => {
        page = new ProjectSingleOppPage();
    });

    describe("Presentation tests", () => {
        it('Title should be ' + fullyLoaded["project"]["KPC"]["title"], () => {
            page.navigateTo();
            let title = page.getProjectTitleElement();
            browser.wait(ExpectedConditions.textToBePresentInElement(title, fullyLoaded["project"]["KPC"]["title"])
                , waitTimeout, "Title was not correct")
            expect(true).toBeTruthy();
        })

        it('Carousel last indicator should display the image ' + fullyLoaded["project"]["KPC"]["images"][2]["imageUrl"], function () {

            page.navigateTo();
            let lastCarouselIndicator = page.getLastCarouselIndicator();
            browser.wait(ExpectedConditions.elementToBeClickable(lastCarouselIndicator)
                , waitTimeout, "Carousel not working");
            lastCarouselIndicator.click();
            page.getCarouselActiveImageDiv().getAttribute('style')
                .then(function (str) { expect(str).toContain(fullyLoaded["project"]["KPC"]["images"][2]["imageUrl"]) });

        });


    })
    describe("Date and place tests", () => {
        it('Location link should open in a new tab Google Maps directions for reaching destination', function () {

            page.navigateTo();
            let locationLink = page.getLocationLink();
            browser.wait(ExpectedConditions.presenceOf(locationLink), waitTimeout, "Location link was not present")

            let hrefAttribute = locationLink.getAttribute('href');

            //check to see if one point is the user location
            hrefAttribute.then(function (str)
            { expect(str).toContain('My', "The user location was not present") });;
            hrefAttribute.then(function (str)
            { expect(str).toContain('Location', "The user location was not present") });;

            locationLink.click().then(function () {
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

        it('It should display:location name, city and state', function () {

            page.navigateTo();
            browser.wait(ExpectedConditions.presenceOf(page.getLocationElement()), waitTimeout, "Location element was not present")

            let locationName = page.getLocationName();
            locationName.then(function (str)
            { expect(str).toContain(fullyLoaded["project"]["KPC"]["location"]["city"], "City was not correct") });
            locationName.then(function (str)
            { expect(str).toContain(fullyLoaded["project"]["KPC"]["location"]["name"], "Location name was not correct") });
            locationName.then(function (str)
            { expect(str).toContain(fullyLoaded["project"]["KPC"]["location"]["state"], "State was not correct") });
        });
    })


    describe("Karma points tests", () => {
        it('It should display the karma points received if the user shares the event', function () {

            page.navigateTo();
            browser.wait(ExpectedConditions.presenceOf(page.getShareKarmaPointsElement()), waitTimeout, "Share karma points was not present")

            page.getShareKarmaPoints().then(function (str) { expect(str).toContain(fullyLoaded["project"]["KPC"]["shareKarmaPoints"]) });

        });

        it('It should display maximum karma points', function () {

            page.navigateTo();
            browser.wait(ExpectedConditions.presenceOf(page.getMaximumKarmaPointsElement()), waitTimeout, "Maximum karma points was not present")

            page.getMaximumKarmaPoints().then(function (str) { expect(str).toContain(fullyLoaded["project"]["KPC"]["maxKarmaPoints"]) });

        });

    })


    describe("Event Page tests", () => {
        it('It should display a link to Event Page', function () {

            page.navigateTo();
            let eventPageLink = page.getLinkToEventPage();
            browser.wait(ExpectedConditions.presenceOf(eventPageLink), waitTimeout, "Link to event page was not present")

            let hrefAttribute = eventPageLink.getAttribute('href');

            hrefAttribute.then(function (str)
            { expect(str).toMatch(fullyLoaded["project"]["KPC"]["projectPageUrl"], "The link was not correct") });

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
    })

    describe("Organizer tests", () => {
        it('It should display: name and organization for the organizer', function () {

            page.navigateTo();
            browser.wait(ExpectedConditions.presenceOf(page.getOrganizerDetailsElement()), waitTimeout, "Organizer details were not present")

            let organizerDetails = page.getOrganizerDetails();

            organizerDetails.then(function (str)
            { expect(str).toContain(fullyLoaded["project"]["KPC"]["organizer"]["name"], "Name was not correctly displayed") });
            organizerDetails.then(function (str)
            { expect(str).toContain(fullyLoaded["project"]["KPC"]["organizer"]["organization"], "Organization was not correctly displayed") });

        });

        it('It should display the image of the organizer', function () {

            page.navigateTo();
            let organizerImage = page.getOrganizerImage();
            browser.wait(ExpectedConditions.presenceOf(organizerImage), waitTimeout, "Organizer image was not present")

            page.getOrganizerImage().getAttribute('src').then(function (str)
            { expect(str).toMatch(fullyLoaded["project"]["KPC"]["organizer"]["imageUrl"]) });

        });

    })

    describe("Oportunities tests", () => {
        it('It should display the community benefit', function () {

            page.navigateTo();
            let communityBenefitElement = page.getFirstBenefitElement();
            browser.wait(ExpectedConditions.presenceOf(communityBenefitElement), waitTimeout, "Community benefit was not present")
            page.getCommunityBenefit().then(function (str)
            { expect(str).toMatch(fullyLoaded["project"]["KPC"]["communityBenefit"]) });

        });

        it('It should display the karma points that the user will receive', function () {

            page.navigateTo();
            let karmaPointsElement = page.getReceivedKarmaPointsElement();
            browser.wait(ExpectedConditions.presenceOf(karmaPointsElement), waitTimeout, "The received karma points were not present")
            page.getReceivedKarmaPoints().then(function (str)
            { expect(str).toContain(fullyLoaded["opp"]["KPC1"]["karma"]) });

        });

        it('It should display the benefits', function () {

            page.navigateTo();
            let benefitElement = page.getReceivedKarmaPointsElement();
            browser.wait(ExpectedConditions.presenceOf(benefitElement), waitTimeout, "The benefit was not present")
            page.getBenefitTitle().then(function (str)
            { expect(str).toContain(fullyLoaded["benefit"]["KPC1-1"]["title"]), "Benefit title was not correct" });
            page.getBenefitDescription().then(function (str)
            { expect(str).toContain(fullyLoaded["benefit"]["KPC1-1"]["description"]), "Benefit description was not correct" });
        });
    })

    describe("Contribution tests", () => {
        it('It should display the contribution', function () {

            page.navigateTo();
            let contribElement = page.getContribElement();
            browser.wait(ExpectedConditions.presenceOf(contribElement), waitTimeout, "Contribution was not present")
            expect(true).toBeTruthy();

        });
    })

})