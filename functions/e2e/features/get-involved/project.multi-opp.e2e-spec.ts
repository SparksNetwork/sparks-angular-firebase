import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { ProjectMultiOppPage } from '../../po/project.multi-opp.po';
import { setData, setUsers } from '../../firebase';
import { getLocationForDirections } from '../helper-functions/project/location-functions';

const waitTimeout = 5000;

describe('Get-Involved: project with multiple opportunities', () => {
    let page: ProjectMultiOppPage;
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const project = fullyLoaded['project']['LC']

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
            .then(done)
        page = new ProjectMultiOppPage();
    })

    describe('exploring the project page', () => {
        beforeAll(() => {
            page.navigateTo()
        })

        it('Title should be ' + project['title'], () => {
            const title = page.getProjectTitleElement();
            browser.wait(ExpectedConditions.textToBePresentInElement(title, project['title'])
                , waitTimeout, 'Title was not correct')
            expect(true).toBeTruthy();
        })

        it('Carousel last indicator should display the image ' + project['images'][2]['imageUrl'], function () {
            const lastCarouselIndicator = page.getLastCarouselIndicator();
            browser.wait(ExpectedConditions.elementToBeClickable(lastCarouselIndicator)
                , waitTimeout, 'Carousel not working');
            lastCarouselIndicator.click();
            page.getCarouselActiveImageDiv().getAttribute('style')
                .then(function (str) { expect(str).toContain(project['images'][2]['imageUrl']) });

        });

        it('The description should be: ' + project['description'], function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getDescriptionElement(),
                project['description']), waitTimeout, 'Description was not correct');
            expect(true).toBeTruthy();
        });

        // multiple opportunities
        it('It should display 5 oportunity links', function () {
            // force the browser to wait until the page loads
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')
            page.getNumberOfOportunityLinks().then(function (str) { expect(str).toBe(5) });

        });

        it('It should display the title for each oportunity ', function () {
            let oppLinks = page.getLinks()
            browser.wait(ExpectedConditions.presenceOf(oppLinks.first()),
                waitTimeout, 'First opportunity link was not present')

            oppLinks.each(function (item) {
                item.getAttribute('href').then((link) => {
                    page.getTitle(item).getText().then((title) => {
                        expect(title).toMatch(fullyLoaded['opp'][GetOppKey(link)]['title'], 'Opportunity title was not correct')
                    })

                })
            })

        });

        it('First oportunity should have the contribution value: ' + fullyLoaded['opp']['LC1']['contribValue'], function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')

            page.getFirstOportunityTitle()
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC1']['contribValue']) });
        });

        it('First oportunity should have the benefit value: ' + fullyLoaded['opp']['LC1']['benefitValue'], function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')

            page.getFirstOportunityContribValue()
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC1']['benefitValue']) });
        });

        it('First oportunity should have a 44% discount', function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '', )
                , waitTimeout, 'Oportunity links were not present')


            page.getFirstOportunityDiscount()
                .then(function (str) { expect(str).toEqual('44% discount') });
        });

        it('Third oportunity should have the title: ' + fullyLoaded['opp']['LC3']['title'], function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')

            page.getThirdOportunityTitle()
                .then(function (str) { expect(str).toEqual(fullyLoaded['opp']['LC3']['title']) });
        });

        it('Third oportunity should have the benefit value: ' + fullyLoaded['opp']['LC3']['benefitValue'], function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')

            page.getThirdOportunityContribValue()
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC3']['benefitValue']) });
        });

        it('It should display maximum karma points', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getMaximumKarmaPointsElement()), waitTimeout, 'Maximum karma points was not present')

            page.getMaximumKarmaPoints().then(function (str) { expect(str).toContain(project['maxKarmaPoints']) });

        });
        it('It should display the karma points received if the user shares the event', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getShareKarmaPointsElement()), waitTimeout, 'Share karma points was not present')

            page.getShareKarmaPoints().then(function (str) { expect(str).toContain(project['shareKarmaPoints']) });

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

    })

    describe('getting directions and more info', () => {
        beforeEach(() => {
            page.navigateTo();
        })

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
    })

    //helper functions
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 1];
    }
});
