import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { setData, setUsers } from '../../firebase';
import { ProjectSingleOppPage } from '../../po/project.single-opp.po';
import { getLocationForDirections } from '../helper-functions/project/location-functions';

const waitTimeout = 5000;

describe('Get-Involved: project with one opportunity', () => {
    let page: ProjectSingleOppPage;
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const project = fullyLoaded['project']['KPC']

    beforeAll(done => {
        page = new ProjectSingleOppPage();
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
            .then(() => page.navigateTo())
            .then(done)
    });

    describe('exploring the project page', () => {

        it('Title should be ' + project['title'], () => {
            const titleEl = page.getProjectTitleElement();

            browser.wait(ExpectedConditions.presenceOf(titleEl),
                waitTimeout, 'Title was not correct')

            titleEl.getText().then((title) => {
                expect(title).toMatch(project['title'])

            })
        })

        it('Carousel last indicator should display the image ' + project['images'][2]['imageUrl'], function () {
            const lastCarouselIndicator = page.getLastCarouselIndicator();
            browser.wait(ExpectedConditions.elementToBeClickable(lastCarouselIndicator)
                , waitTimeout, 'Carousel not working');
            lastCarouselIndicator.click();
            page.getCarouselActiveImageDiv().getAttribute('style')
                .then(function (str) { expect(str).toContain(project['images'][2]['imageUrl']) });

        });

        it('It should display:location name, city and state', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getLocationElement()), waitTimeout, 'Location element was not present')

            const locationName = page.getLocationName();
            locationName.then(function (str)
            { expect(str).toContain(project['location']['city'], 'City was not correct') });
            locationName.then(function (str)
            { expect(str).toContain(project['location']['name'], 'Location name was not correct') });
            locationName.then(function (str)
            { expect(str).toContain(project['location']['state'], 'State was not correct') });
        });

        it('It should display the karma points received if the user shares the event', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getShareKarmaPointsElement()), waitTimeout, 'Share karma points was not present')

            page.getShareKarmaPoints().then(function (str) { expect(str).toContain(project['shareKarmaPoints']) });

        });

        it('It should display maximum karma points', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getMaximumKarmaPointsElement()), waitTimeout, 'Maximum karma points was not present')

            page.getMaximumKarmaPoints().then(function (str) { expect(str).toContain(project['maxKarmaPoints']) });

        });

        it('It should display: name and organization for the organizer', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getOrganizerDetailsElement()), waitTimeout, 'Organizer details were not present')

            const organizerDetails = page.getOrganizerDetails();

            organizerDetails.then(function (str)
            { expect(str).toContain(project['organizer']['name'], 'Name was not correctly displayed') });
            organizerDetails.then(function (str)
            { expect(str).toContain(project['organizer']['organization'], 'Organization was not correctly displayed') });

        });

        it('It should display the image of the organizer', function () {
            const organizerImage = page.getOrganizerImage();
            browser.wait(ExpectedConditions.presenceOf(organizerImage), waitTimeout, 'Organizer image was not present')

            page.getOrganizerImage().getAttribute('src').then(function (str)
            { expect(str).toMatch(project['organizer']['imageUrl']) });

        });

        it('It should display the community benefit', function () {
            const communityBenefitElement = page.getFirstBenefitElement();
            browser.wait(ExpectedConditions.presenceOf(communityBenefitElement), waitTimeout, 'Community benefit was not present')
            page.getCommunityBenefit().then(function (str)
            { expect(str).toMatch(project['communityBenefit']) });

        });

        it('It should display the karma points that the user will receive', function () {
            const karmaPointsElement = page.getReceivedKarmaPointsElement();
            browser.wait(ExpectedConditions.presenceOf(karmaPointsElement), waitTimeout, 'The received karma points were not present')
            page.getReceivedKarmaPoints().then(function (str)
            { expect(str).toContain(fullyLoaded['opp']['KPC1']['karma']) });

        });

        it('It should display the benefits', function () {
            const benefitElement = page.getReceivedKarmaPointsElement();
            browser.wait(ExpectedConditions.presenceOf(benefitElement), waitTimeout, 'The benefit was not present')
            page.getBenefitTitle().then(function (str)
            { expect(str).toContain(fullyLoaded['benefit']['KPC1-1']['title'], 'Benefit title was not correct') });
            page.getBenefitDescription().then(function (str)
            { expect(str).toContain(fullyLoaded['benefit']['KPC1-1']['description'], 'Benefit description was not correct') });
        });

        it('It should display the contribution', function () {

            page.navigateTo();
            const contribElement = page.getContribElement();
            browser.wait(ExpectedConditions.presenceOf(contribElement), waitTimeout, 'Contribution was not present')
            expect(true).toBeTruthy();

        });
    })


    describe('getting directions and more info', () => {

        beforeEach(() => {
            page.navigateTo();
        })

        it('It should display a link to Event Page', function () {

            const eventPageLink = page.getLinkToEventPage();
            browser.wait(ExpectedConditions.presenceOf(eventPageLink), waitTimeout, 'Link to event page was not present')

            const hrefAttribute = eventPageLink.getAttribute('href');

            hrefAttribute.then(function (str)
            { expect(str).toMatch(project['projectPageUrl'], 'The link was not correct') });

            eventPageLink.click().then(function () {
                browser.getAllWindowHandles().then(function (handles) {
                    const newWindowHandle = handles[1]; // this is the new window

                    browser.switchTo().window(newWindowHandle).then(function () {
                        expect(browser.getCurrentUrl()).toEqual(hrefAttribute, 'The link did not open');
                    });
                    browser.close();
                    browser.switchTo().window(handles[0]);
                });
            });
        });

        it('Location link should open in a new tab Google Maps directions for reaching destination', function () {
            const locationLink = page.getLocationLink();
            browser.wait(ExpectedConditions.presenceOf(locationLink), waitTimeout, 'Location link was not present')

            const hrefAttribute = locationLink.getAttribute('href');

            hrefAttribute.then(function (str) {
                expect(str).toContain('My', 'The user location was not present')
                expect(str).toContain('Location', 'The user location was not present')
                if (!project['location']) {
                    expect(str).toContain(getLocationForDirections(project['location']['latitude'],
                        project['location']['longitude'], project['location']['name'],
                        project['location']['address'], project['location']['city'], project['location']['state']))

                }
            });

            locationLink.click().then(function () {
                browser.getAllWindowHandles().then(function (handles) {
                    const newWindowHandle = handles[1]; // this is the new window

                    browser.switchTo().window(newWindowHandle).then(function () {
                        expect(browser.getCurrentUrl()).toContain('www.google.com/maps', 'The link did not open');
                    });
                    browser.close();
                    browser.switchTo().window(handles[0]);
                });
            });
        });

    })
})