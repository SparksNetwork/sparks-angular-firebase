import { browser, ExpectedConditions } from "protractor/built";
import { ProjectPage } from "../../../po/project.po";
import { DatePipe } from '@angular/common'
import { getFormatedTimeInterval } from "./time-interval-functions";
import { getLocationForDirections } from "./location-functions";

const waitTimeout = 5000

function testTitle(page: ProjectPage, project: any) {
    const titleEl = page.getProjectTitleElement();

    browser.wait(ExpectedConditions.presenceOf(titleEl),
        waitTimeout, 'Project title was not present')

    return titleEl.getText().then((title) => {
        expect(title).toMatch(project['title'], 'The project title was not correct')

    })

}

function testLocation(page: ProjectPage, project: any) {

    browser.wait(ExpectedConditions.presenceOf(page.getLocationElement()),
        waitTimeout, 'Project location element was not present')

    const locationName = page.getLocationName();
    locationName.then(function (str)
    { expect(str).toContain(project['location']['city'], 'City was not correct') });
    locationName.then(function (str)
    { expect(str).toContain(project['location']['name'], 'Location name was not correct') });
    return locationName.then(function (str)
    { expect(str).toContain(project['location']['state'], 'State was not correct') });

}

function testReceivedKarmaPoints(page: ProjectPage, project: any) {
    browser.wait(ExpectedConditions.presenceOf(page.getMaximumKarmaPointsElement()),
        waitTimeout, 'project maximum karma points was not present')
    return page.getMaximumKarmaPoints().then(function (str) {
        expect(str).toContain(project['maxKarmaPoints'], 'Project maximum karma points were not displayed')
    });
}

function testDate(page: ProjectPage, project: any) {
    let projectDate = page.getDate();
    browser.wait(ExpectedConditions.presenceOf(projectDate),
        waitTimeout, 'The project date was not present')

    let datePipe: DatePipe = new DatePipe('longDate');

    return projectDate.getText().then(function (str) {
        expect(str).toMatch(getFormatedTimeInterval(project['startDateTime'],
            project['endDateTime']), 'Project date was not correct displayed')

    })
}

function testOrganizer(page: ProjectPage, project: any) {
    browser.wait(ExpectedConditions.presenceOf(page.getOrganizerDetailsElement()),
        waitTimeout, 'Organizer details were not present')

    const organizerDetails = page.getOrganizerDetails();

    organizerDetails.then(function (str)
    { expect(str).toContain(project['organizer']['name'], 'Name was not correctly displayed') });
    return organizerDetails.then(function (str)
    { expect(str).toContain(project['organizer']['organization'], 'Organization was not correctly displayed') });

}

function testLinkToEventPage(page: ProjectPage, project: any) {
    const eventPageLink = page.getLinkToEventPage();
    browser.wait(ExpectedConditions.presenceOf(eventPageLink),
        waitTimeout, 'Link to event page was not present')

    const hrefAttribute = eventPageLink.getAttribute('href');

    hrefAttribute.then(function (str)
    { expect(str).toMatch(project['projectPageUrl'], 'The link to Event Page was not correct') });

    return eventPageLink.click().then(function () {
        browser.getAllWindowHandles().then(function (handles) {
            const newWindowHandle = handles[1]; // this is the new window

            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toEqual(hrefAttribute,
                    'The link to Event Page did not open');
            });
            browser.close();
            browser.switchTo().window(handles[0]);
        });
    });
}

function testLocationLink(page: ProjectPage, project: any) {
    const locationLink = page.getLocationLink();
    browser.wait(ExpectedConditions.presenceOf(locationLink),
        waitTimeout, 'Project location link was not present')

    const hrefAttribute = locationLink.getAttribute('href');

    hrefAttribute.then(function (str) {
        expect(str).toContain('My', 'The user location was not present in Project location link')
        expect(str).toContain('Location', 'The user location was not present in Project location link')
        if (!project['location']) {
            expect(str).toContain(getLocationForDirections(project['location']['latitude'],
                project['location']['longitude'], project['location']['name'],
                project['location']['address'], project['location']['city'], project['location']['state']),
                'The project link to google maps was not build correctly ')

        }
    });

    return locationLink.click().then(function () {
        browser.getAllWindowHandles().then(function (handles) {
            const newWindowHandle = handles[1]; // this is the new window

            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toContain('www.google.com/maps', 'The project link to google maps did not open');
            });
            browser.close();
            browser.switchTo().window(handles[0]);
        });
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

}