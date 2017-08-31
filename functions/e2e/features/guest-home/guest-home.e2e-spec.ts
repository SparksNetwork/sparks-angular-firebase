import 'jasmine' // to clear lint errors
import { browser, element, by, ExpectedConditions } from 'protractor'
import { setData, updateData, setUsers, signOut } from '../../firebase'
import { GuestHomePage } from '../../po/guest-home.po'
import { DatePipe } from '@angular/common'
import { ProjectMultiOppPage } from '../../po/project.multi-opp.po';

const waitTimeout = 5000;

describe('Guest home page: user is not logged in', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const projects = fullyLoaded['project']
    let page: GuestHomePage;

    //helper functions
    function validatePropertyAgainstDatabase(propertyName: string, displayedValue: string): boolean {
        for (let key in projects) {
            if (projects[key][propertyName].toString() === displayedValue) {
                return true;
            }
        }
        return false;
    }
    function getDisplayedProjectKey(url: string): string {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 1];
    }

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => page.navigateTo())
            //user is not logged in
            .then(signOut)
            .then(done)
        page = new GuestHomePage();
    })


    describe('exploring the project page', () => {

        it('It should display a welcome message for the guest', () => {

            let welcomeMessage = page.getWelcomeMessage()
            browser.wait(ExpectedConditions.presenceOf(welcomeMessage),
                waitTimeout, 'Welcome message was not present')

            welcomeMessage.getText().then(function (str) {
                expect(str).toContain('Guest')
            })
        })

        it('It should display all projects', () => {

            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                waitTimeout, 'First link was not present')

            //looping through all the keys and see if all projects are displayed 
            let isPresent: boolean = false;
            for (let key in projects) {
                isPresent = false;
                projectLinks.each(function (item) {
                    item.getAttribute('href').then(function (str) {
                        if (getDisplayedProjectKey(str) === key.toString()) {
                            isPresent = true;
                        }
                    })
                }).then(function () {
                    expect(isPresent).toBe(true, 'Project with key ' + key.toString() + ' was not present');
                })
            }
        })

        it('Each project should display the title', () => {

            let projectTitles = page.getAllProjectTitles();
            browser.wait(ExpectedConditions.presenceOf(projectTitles.first()),
                waitTimeout, 'First title was not present')

            projectTitles.each(function (item) {
                item.getText().then(function (str)
                { expect(validatePropertyAgainstDatabase('title', str)).toEqual(true) })
            })
        })

        it('Each project should display the maximum Karma Points', () => {

            let projectKarmaPoints = page.getAllProjectMaxKarmaPoints()
            browser.wait(ExpectedConditions.presenceOf(projectKarmaPoints.first()),
                waitTimeout, 'First maximum karma points div was not present')

            projectKarmaPoints.each(function (item) {
                item.getText().then(function (str)
                { expect(validatePropertyAgainstDatabase('maxKarmaPoints', str)).toEqual(true) })
            })

        })

        it('Each project should display the location', () => {

            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                waitTimeout, 'First link was not present')

            let projectIndex: number = 0;
            projectLinks.each(function (item) {
                item.getAttribute('href').then(function (str) {
                    let projectLocation = page.getProjectLocation(projectIndex)
                    let projectKey = getDisplayedProjectKey(str)
                    projectLocation.getText().then(function (str) {
                        expect(str).toContain(projects[projectKey]['location']['name'], 'Location name was not displayed')
                        expect(str).toContain(projects[projectKey]['location']['city'], 'City was not displayed')
                    })
                }).then(function () {
                    projectIndex++;
                })
            })
        })

        it('Each project should display the date', () => {

            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                waitTimeout, 'First link was not present')

            let datePipe: DatePipe = new DatePipe('longDate');
            let projectIndex: number = 0;
            projectLinks.each(function (item) {
                item.getAttribute('href').then(function (str) {
                    let projectDate = page.getProjectDate(projectIndex)
                    let projectKey = getDisplayedProjectKey(str)
                    projectDate.getText().then(function (str) {
                        expect(str).toContain(datePipe.transform(projects[projectKey]['startDateTime'], 'longDate'),
                            'Start date was not correct displayed')
                        if (projects[projectKey]['endDateTime']) {
                            expect(str).toContain(datePipe.transform(projects[projectKey]['endDateTime'], 'longDate'),
                                'End date was not correct displayed')
                        }
                    })
                }).then(function () {
                    projectIndex++;
                })
            })
        })

        it('Each project card should open the project page and see the title', () => {

            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                waitTimeout, 'First link was not present')

            projectLinks.count().then(function (projectsNo) {
                for (let i = 0; i < projectsNo; i++) {
                    let projectKey: string;
                    let currentProjectLink = page.getProjectLink(i)
                    browser.wait(ExpectedConditions.presenceOf(currentProjectLink),
                        waitTimeout, 'Link ' + i + ' was not present').then(function () {
                            currentProjectLink.getAttribute('href').then(function (str) {
                                page.getProjectTitle(currentProjectLink).click().then(function () {
                                    let projectKey = getDisplayedProjectKey(str)
                                    browser.wait(ExpectedConditions.urlContains('/project/' + projectKey),
                                        waitTimeout, 'Link to project ' + projectKey + ' did not open')
                                        .then(function () {
                                            let projectPage = new ProjectMultiOppPage()
                                            let projectTitle = projectPage.getProjectTitleElement();
                                            browser.wait(ExpectedConditions.presenceOf(projectTitle),
                                                waitTimeout, 'Title of project ' + projectKey + ' was not present')
                                                .then(function () {
                                                    projectTitle.getText().then(function (title) {
                                                        expect(title).toEqual(projects[projectKey]['title'], 'Title of project ' + projectKey + ' was not correct')
                                                        page.navigateTo()
                                                    })

                                                })

                                        })

                                })

                            })
                        })

                }
            })
        })
    })
})


