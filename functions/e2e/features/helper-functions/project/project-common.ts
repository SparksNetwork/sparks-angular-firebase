import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { ProjectPage } from '../../../po/project.po';
import { DatePipe } from '@angular/common'
import { getFormatedTimeInterval } from './time-interval-functions';
import { getLocationForDirections } from './location-functions';
import { WAIT_TIMEOUT } from '../shared';


function testTitle(page: ProjectPage, project: any) {
    const titleEl = page.getProjectTitleElement();

    browser.wait(ExpectedConditions.presenceOf(titleEl),
        WAIT_TIMEOUT, 'On Project page title was not present')

    return titleEl.getText().then((title) => {
        expect(title).toMatch(project['title'], 'On Project page the title was not correct')

    })

}

function testCarousel(page: ProjectPage, project: any) {
    const lastCarouselIndicator = page.getLastCarouselIndicator();
    browser.wait(ExpectedConditions.elementToBeClickable(lastCarouselIndicator)
        , WAIT_TIMEOUT, 'On Project page carousel was not working');
    lastCarouselIndicator.click();
    page.getCarouselActiveImageDiv().getAttribute('style')
        .then(function (str) {
            expect(str).toContain(project['images'][2]['imageUrl'],
                'On Project page the carousel image was not correct')
        });
}

function testDescription(page: ProjectPage, project: any) {
    page.getDescriptionElement().getText().then((description) => {
        expect(description).toMatch(project['description'],
            'On Project page the description was not correct')
    })

}

function testLocation(page: ProjectPage, project: any) {

    browser.wait(ExpectedConditions.presenceOf(page.getLocationElement()),
        WAIT_TIMEOUT, 'On Project page location element was not present')

    const locationName = page.getLocationName();
    locationName.then(function (str)
    { expect(str).toContain(project['location']['city'], 'On Project page city was not correct') });
    locationName.then(function (str)
    { expect(str).toContain(project['location']['name'], 'On Project page location name was not correct') });
    return locationName.then(function (str)
    { expect(str).toContain(project['location']['state'], 'On Project page state was not correct') });

}

function testReceivedKarmaPoints(page: ProjectPage, project: any) {
    browser.wait(ExpectedConditions.presenceOf(page.getMaximumKarmaPointsElement()),
        WAIT_TIMEOUT, 'On Project page maximum karma points were not present')
    return page.getMaximumKarmaPoints().then(function (str) {
        expect(str).toContain(project['maxKarmaPoints'],
            'On Project page maximum karma points were not correct')
    });
}

function testDate(page: ProjectPage, project: any) {
    let projectDate = page.getDate();
    browser.wait(ExpectedConditions.presenceOf(projectDate),
        WAIT_TIMEOUT, 'On Project page the date was not present')

    let datePipe: DatePipe = new DatePipe('longDate');

    return projectDate.getText().then(function (str) {
        expect(str).toMatch(getFormatedTimeInterval(project['startDateTime'],
            project['endDateTime']), 'On Project page date was not displayed correctly')

    })
}

function testOrganizer(page: ProjectPage, project: any) {
    browser.wait(ExpectedConditions.presenceOf(page.getOrganizerDetailsElement()),
        WAIT_TIMEOUT, 'On Project page organizer details were not present')

    const organizerDetails = page.getOrganizerDetails();

    organizerDetails.then(function (str) {
        expect(str).toContain(project['organizer']['name'],
            'On Project page Organizer name was not correctly displayed')
    });
    organizerDetails.then(function (str) {
        expect(str).toContain(project['organizer']['organization'],
            'On Project page the organization was not correctly displayed')
    });

    const organizerImage = page.getOrganizerImage();
    browser.wait(ExpectedConditions.presenceOf(organizerImage), WAIT_TIMEOUT,
        'On Project page organizer image was not present')

    return page.getOrganizerImage().getAttribute('style').then(function (str) {
        expect(str).toContain(project['organizer']['imageUrl'],
            'On Project page the organizer image was no correctly displayed')
    });
}

function testLinkToEventPage(page: ProjectPage, project: any) {
    const eventPageLink = page.getLinkToEventPage();
    browser.wait(ExpectedConditions.presenceOf(eventPageLink),
        WAIT_TIMEOUT, 'On Project page link to Event Page was not present')

    const hrefAttribute = eventPageLink.getAttribute('href');

    hrefAttribute.then(function (str) {
        expect(str).toMatch(project['projectPageUrl'],
            'On Project page the link to Event Page was not correct')
    });

    return eventPageLink.click().then(function () {
        browser.getAllWindowHandles().then(function (handles) {
            const newWindowHandle = handles[1]; // this is the new window

            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toEqual(hrefAttribute,
                    'On Project page the link to Event Page did not open');
            });
            browser.close();
            browser.switchTo().window(handles[0]);
        });
    });
}

function testLocationLink(page: ProjectPage, project: any) {
    const locationLink = page.getLocationLink();
    browser.wait(ExpectedConditions.presenceOf(locationLink),
        WAIT_TIMEOUT, 'On Project page the location link was not present')

    const hrefAttribute = locationLink.getAttribute('href');

    hrefAttribute.then(function (str) {
        if (!project['location']) {
            expect(str).toContain(getLocationForDirections(project['location']['latitude'],
                project['location']['longitude'], project['location']['name'],
                project['location']['address'], project['location']['city'], project['location']['state']),
                'On Project page the link to google maps was not build correctly ')

        }
    });

    return locationLink.click().then(function () {
        browser.getAllWindowHandles().then(function (handles) {
            const newWindowHandle = handles[1]; // this is the new window

            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toContain('www.google.com/maps',
                    'On Project page the link to google maps did not open');
            });
            browser.close();
            browser.switchTo().window(handles[0]);
        });
    });
}

function testShareKarmaPoints(page: ProjectPage, project: any) {
    browser.wait(ExpectedConditions.presenceOf(page.getShareKarmaPointsElement()),
        WAIT_TIMEOUT, 'On Project page the share karma points was not present')

    page.getShareKarmaPoints().then(function (str) {
        expect(str).toContain(project['shareKarmaPoints'],
            'On Project page the share karma points were not correclty displayed')
    });
}

export function testCommonProjectInformation(page: ProjectPage, project: any) {
    return testTitle(page, project)
        .then(() => testDate(page, project))
        .then(() => testLocation(page, project))
        .then(() => testReceivedKarmaPoints(page, project))
        .then(() => testLinkToEventPage(page, project))
        .then(() => testLocationLink(page, project))
        .then(() => testOrganizer(page, project))
        .then(() => testDescription(page, project))
        .then(() => testCarousel(page, project))
        .then(() => testShareKarmaPoints(page, project))

}