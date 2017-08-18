import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { ProjectMultiOppPage } from '../../po/project.multi-opp.po';
import { setData, setUsers } from '../../firebase';

const waitTimeout = 5000;

fdescribe('Get-Involved: project with multiple opportunities', () => {
    let page: ProjectMultiOppPage;
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const projectMultiple = fullyLoaded['project']['LC']
    const projectSingle = fullyLoaded['project']['KPC']

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
            .then(done)
        page = new ProjectMultiOppPage();
    })

    describe('exploring a project page', () => {
        beforeAll(() => {
            page.navigateTo()
        })

        it('Title should be ' + projectMultiple['title'], () => {
            const title = page.getProjectTitleElement();
            browser.wait(ExpectedConditions.textToBePresentInElement(title, projectMultiple['title'])
                , waitTimeout, 'Title was not correct')
            expect(true).toBeTruthy();
        })

        it('Carousel last indicator should display the image ' + projectMultiple['images'][2]['imageUrl'], function () {
            const lastCarouselIndicator = page.getLastCarouselIndicator();
            browser.wait(ExpectedConditions.elementToBeClickable(lastCarouselIndicator)
                , waitTimeout, 'Carousel not working');
            lastCarouselIndicator.click();
            page.getCarouselActiveImageDiv().getAttribute('style')
                .then(function (str) { expect(str).toContain(projectMultiple['images'][2]['imageUrl']) });

        });

        it('The description should be: ' + projectMultiple['description'], function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getDescriptionElement(),
                projectMultiple['description']), waitTimeout, 'Description was not correct');
            expect(true).toBeTruthy();
        });

        // multiple opportunities
        it('It should display 5 oportunity links', function () {
            // force the browser to wait until the page loads
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')
            page.getNumberOfOportunityLinks().then(function (str) { expect(str).toBe(5) });

        });

        it('It should display a specific icon for each oportunity ', function () {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.getFirstOportunityTitleElement(), '')
                , waitTimeout, 'Oportunity links were not present')

            page.getFirstOportunitySpan().getAttribute('class')
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC1']['icon']) });

            page.getSecondOportunitySpan().getAttribute('class')
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC2']['icon']) });

            page.getThirdOportunitySpan().getAttribute('class')
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC3']['icon']) });

            page.getFourthOportunitySpan().getAttribute('class')
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC4']['icon']) });

            page.getFifthOportunitySpan().getAttribute('class')
                .then(function (str) { expect(str).toContain(fullyLoaded['opp']['LC5']['icon']) });
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

            page.getMaximumKarmaPoints().then(function (str) { expect(str).toContain(projectMultiple['maxKarmaPoints']) });

        });
        it('It should display the karma points received if the user shares the event', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getShareKarmaPointsElement()), waitTimeout, 'Share karma points was not present')

            page.getShareKarmaPoints().then(function (str) { expect(str).toContain(projectMultiple['shareKarmaPoints']) });

        });

        it('It should display: name and organization for the organizer', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getOrganizerDetailsElement()), waitTimeout, 'Organizer details were not present')

            const organizerDetails = page.getOrganizerDetails();

            organizerDetails.then(function (str)
            { expect(str).toContain(projectMultiple['organizer']['name'], 'Name was not correctly displayed') });
            organizerDetails.then(function (str)
            { expect(str).toContain(projectMultiple['organizer']['organization'], 'Organization was not correctly displayed') });

        });

        it('It should display the image of the organizer', function () {
            const organizerImage = page.getOrganizerImage();
            browser.wait(ExpectedConditions.presenceOf(organizerImage), waitTimeout, 'Organizer image was not present')

            page.getOrganizerImage().getAttribute('src').then(function (str)
            { expect(str).toMatch(projectMultiple['organizer']['imageUrl']) });

        });

        it('It should display:location name, city and state', function () {
            browser.wait(ExpectedConditions.presenceOf(page.getLocationElement()), waitTimeout, 'Location element was not present')

            const locationName = page.getLocationName();
            locationName.then(function (str)
            { expect(str).toContain(projectMultiple['location']['city'], 'City was not correct') });
            locationName.then(function (str)
            { expect(str).toContain(projectMultiple['location']['name'], 'Location name was not correct') });
            locationName.then(function (str)
            { expect(str).toContain(projectMultiple['location']['state'], 'State was not correct') });
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

            // check to see if the latitude and longitude are taken from firebase
            hrefAttribute.then(function (str)
            { expect(str).toContain(projectMultiple['location']['longitude'], 'The longitude was not correct') }); ;
            hrefAttribute.then(function (str)
            { expect(str).toContain(projectMultiple['location']['latitude'], 'The latitude was not correct') }); ;

            // check to see if one point is the user location
            hrefAttribute.then(function (str)
            { expect(str).toContain('My', 'The user location was not present') }); ;
            hrefAttribute.then(function (str)
            { expect(str).toContain('Location', 'The user location was not present') }); ;

            locationLink.click().then(function () {
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

        it('It should display a link to Event Page', function () {

            const eventPageLink = page.getLinkToEventPage();
            browser.wait(ExpectedConditions.presenceOf(eventPageLink), waitTimeout, 'Link to event page was not present')

            const hrefAttribute = eventPageLink.getAttribute('href');

            hrefAttribute.then(function (str)
            { expect(str).toMatch(projectMultiple['projectPageUrl'], 'The link was not correct') });

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

});
