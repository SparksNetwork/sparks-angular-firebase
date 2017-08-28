import 'jasmine'
import { browser, element, by, ExpectedConditions, ElementFinder } from 'protractor'
import { setData, setUsers, signOut, signIn } from '../../firebase'
import { USER_VERIFIED_NO_PROFILE, USER_VERIFIED_PROFILE, USER_NOT_VERIFIED } from '../../fixtures/users'
import { UserHomePage } from "../../po/user-home.po";
const waitTimeout = 5000
import { DatePipe } from '@angular/common'
import { ProjectSingleOppPage } from "../../po/project.single-opp.po";

describe('Home page: user can browse projects from home page', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const projects = fullyLoaded['project']
    let page: UserHomePage
    let x: Array<string>;

    function getDisplayedProjectKey(url: string): string {
        let splittedUrl = url.split('/');
        let possibleKey = splittedUrl[splittedUrl.length - 1];
        if (possibleKey === 'join') {
            return splittedUrl[splittedUrl.length - 2];
        } else {
            return splittedUrl[splittedUrl.length - 1];
        }
    }

    function AllProjectsKeys() {
        let projectLinks = page.getListOfProjectLinks();
        browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
            waitTimeout, 'First link was not present')

        projectLinks.count().then(function (projectsNo) {
            for (let i = 0; i < projectsNo; i++) {
                let projectKey: string;
                let currentProjectLink = page.getProjectLink(i)
                browser.wait(ExpectedConditions.presenceOf(currentProjectLink),
                    waitTimeout, 'Link ' + i + ' was not present').then(function () {
                        page.getProjectTitle(currentProjectLink).click().then(function () {

                            currentProjectLink.getId().then((id) => {
                                browser.wait(ExpectedConditions.urlContains('/project/'),
                                    waitTimeout, 'Link to project ' + projectKey + ' did not open')
                                    .then(function () {
                                        browser.getCurrentUrl().then(function (str) {
                                            let key = getDisplayedProjectKey(str)
                                            x.push(key)
                                            console.log(key)
                                            page.navigateTo()

                                        })
                                    })
                            })
                        })
                    })

            }
        })
    }

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(done)
        page = new UserHomePage();

    })

    describe('a logged-in user with no profile', () => {

        beforeAll(done => {
            page.navigateTo()
                .then(signOut)
                .then(function () {
                    signIn(USER_VERIFIED_NO_PROFILE.email, USER_VERIFIED_NO_PROFILE.password)
                }).then(() => {
                    x = new Array<string>();
                    AllProjectsKeys()
                })
                .then(done)
        })

        it('It should see all projects', () => {
            testSeeAllProjects()
        })

        it('Each project should display the title', () => {
            testAllProjectsTitle()
        })

        it('Each project should display the maximum Karma Points', () => {
            testAllProjectsMaxKarmaPoints()
        })

        it('Each project should display the location', () => {
            testAllProjectsLocation()
        })

        it('Each project should display the date', () => {
            testAllProjectsDate()
        })

        it('Each project card should open the project page and see the title', () => {
            testAllProjectsLinks()
        })
    })

    describe('a logged-in user with a profile', () => {

        beforeAll(done => {
            page.navigateTo()
                .then(signOut)
                .then(function () {
                    signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password)
                })
                .then(done)
        })

        it('It should see all projects', () => {
            testSeeAllProjects()
        })

        it('Each project should display the title', () => {
            testAllProjectsTitle()
        })

        it('Each project should display the maximum Karma Points', () => {
            testAllProjectsMaxKarmaPoints()
        })

        it('Each project should display the location', () => {
            testAllProjectsLocation()
        })

        it('Each project should display the date', () => {
            testAllProjectsDate()
        })

        it('Each project card should open the project page and see the title', () => {
            testAllProjectsLinks()
        })
    })

    describe('a logged-in with mail not verified', () => {

        beforeAll(done => {
            page.navigateTo()
                .then(signOut)
                .then(function () {
                    signIn(USER_NOT_VERIFIED.email, USER_NOT_VERIFIED.password)
                })
                .then(done)
        })

        it('It should see all projects', () => {

            testSeeAllProjects()
        })

        it('Each project should display the title', () => {
            testAllProjectsTitle()
        })

        it('Each project should display the maximum Karma Points', () => {
            testAllProjectsMaxKarmaPoints()
        })

        it('Each project should display the location', () => {
            testAllProjectsLocation()
        })

        it('Each project should display the date', () => {
            testAllProjectsDate()
        })

        it('Each project card should open the project page and see the title', () => {
            testAllProjectsLinks()
        })

    })

    describe('a logged out user ', () => {

        beforeAll(done => {
            page.navigateTo()
                .then(signOut)
                .then(done)
        })

        it('It should display a welcome message for the guest', () => {

            let welcomeMessage = page.getWelcomeMessage()
            browser.wait(ExpectedConditions.presenceOf(welcomeMessage),
                waitTimeout, 'Welcome message was not present')

            welcomeMessage.getText().then(function (str) {
                expect(str).toContain('Guest')
            })
        })

        it('It should see all projects', () => {
            testSeeAllProjects()
        })

        it('Each project should display the title', () => {
            testAllProjectsTitle()
        })

        it('Each project should display the maximum Karma Points', () => {
            testAllProjectsMaxKarmaPoints()
        })

        it('Each project should display the location', () => {
            testAllProjectsLocation()
        })

        it('Each project should display the date', () => {
            testAllProjectsDate()
        })

        it('Each project card should open the project page and see the title', () => {
            testAllProjectsLinks()
        })
    })

    //helper functions
    function validatePropertyAgainstDatabase(propertyName: string, displayedValue: string): boolean {
        for (let key in projects) {
            if (projects[key][propertyName].toString() === displayedValue) {
                return true;
            }
        }
        return false;
    }

    function testSeeAllProjects() {
        let projectLinks = page.getListOfProjectLinks();
        browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
            waitTimeout, 'First link was not present')
        //looping through all the keys and see if all projects are displayed 
        let isPresent: boolean = false;
        for (let key in projects) {
            isPresent = false;
            for (let displayedKey of x) {
                if (key === displayedKey) {
                    isPresent = true;
                }
            }
            expect(isPresent).toBeTruthy()
        }

    }
    function testAllProjectsTitle() {

        let projectTitles = page.getAllProjectTitles();
        browser.wait(ExpectedConditions.presenceOf(projectTitles.first()),
            waitTimeout, 'First title was not present')

        projectTitles.each(function (item) {
            item.getText().then(function (str)
            { expect(validatePropertyAgainstDatabase('title', str)).toEqual(true) })
        })
    }
    function testAllProjectsMaxKarmaPoints() {
        let projectKarmaPoints = page.getAllProjectMaxKarmaPoints()
        browser.wait(ExpectedConditions.presenceOf(projectKarmaPoints.first()),
            waitTimeout, 'First maximum karma points div was not present')

        projectKarmaPoints.each(function (item) {
            item.getText().then(function (str)
            { expect(validatePropertyAgainstDatabase('maxKarmaPoints', str)).toEqual(true) })
        })
    }

    function testAllProjectsLocation() {
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


    }
    function testAllProjectsDate() {
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
    }

    function testAllProjectsLinks() {
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
                                        let projectPage = new ProjectSingleOppPage()
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
    }

})