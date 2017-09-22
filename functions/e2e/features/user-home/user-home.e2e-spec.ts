import 'jasmine'
import { browser, element, by, ExpectedConditions, ElementFinder } from 'protractor'
import { setData, setUsers, signOut, signIn } from '../../firebase'
import { USER_VERIFIED_NO_PROFILE, USER_VERIFIED_PROFILE, USER_NOT_VERIFIED } from '../../fixtures/users'
import { UserHomePage } from '../../po/user-home.po';
import { DatePipe } from '@angular/common'
import { ProjectSingleOppPage } from '../../po/project.single-opp.po';
import { getFormatedTimeInterval } from '../helper-functions/project/time-interval-functions'
import { WAIT_TIMEOUT } from "../helper-functions/shared";

describe('Home page: user can browse projects from home page', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const projects = fullyLoaded['project']
    let page: UserHomePage

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(done)
        page = new UserHomePage();

    })

    // describe('a logged-in user with no profile', () => {

    //     beforeAll(done => {
    //         page.navigateTo()
    //             .then(signOut)
    //             .then(function () {
    //                 signIn(USER_VERIFIED_NO_PROFILE.email, USER_VERIFIED_NO_PROFILE.password)
    //             })
    //             .then(done)
    //     })
    //     TestsCommonToAllTypeOfUsers()
    // })

    // describe('a logged-in user with a profile', () => {

    //     beforeAll(done => {
    //         page.navigateTo()
    //             .then(signOut)
    //             .then(function () {
    //                 signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password)
    //             })
    //             .then(done)
    //     })

    //     TestsCommonToAllTypeOfUsers()
    // })

    // describe('a logged-in with mail not verified', () => {

    //     beforeAll(done => {
    //         page.navigateTo()
    //             .then(signOut)
    //             .then(function () {
    //                 signIn(USER_NOT_VERIFIED.email, USER_NOT_VERIFIED.password)
    //             })
    //             .then(done)
    //     })

    //     TestsCommonToAllTypeOfUsers()

    // })

    describe('a logged out user ', () => {

        beforeAll(done => {
            page.navigateTo()
                .then(signOut)
                .then(done)
        })

        it('It should display a welcome message for the guest', () => {

            let welcomeMessage = page.getWelcomeMessage()
            browser.wait(ExpectedConditions.presenceOf(welcomeMessage),
                WAIT_TIMEOUT, 'Welcome message was not present')

            welcomeMessage.getText().then(function (str) {
                expect(str).toContain('Guest')
            })
        })

        TestsCommonToAllTypeOfUsers()

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

    function GetDisplayedProjectKey(url: string): string {
        let splittedUrl = url.split('/');
        let possibleKey = splittedUrl[splittedUrl.length - 1];
        if (possibleKey === 'join') {
            return splittedUrl[splittedUrl.length - 2];
        } else {
            return splittedUrl[splittedUrl.length - 1];
        }
    }

    function TestsCommonToAllTypeOfUsers() {
        it('It should see all projects', () => {
            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                WAIT_TIMEOUT, 'First link was not present')

            //looping through all the keys and see if all projects are displayed 
            let isPresent: boolean = false;
            for (let key in projects) {
                isPresent = false;
                projectLinks.each(function (item) {
                    item.getAttribute('href').then(function (str) {
                        if (GetDisplayedProjectKey(str) === key.toString()) {
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
                WAIT_TIMEOUT, 'First title was not present')

            projectTitles.each(function (item) {
                item.getText().then(function (str)
                { expect(validatePropertyAgainstDatabase('title', str)).toEqual(true) })
            })
        })

        it('Each project should display the maximum Karma Points', () => {
            let projectKarmaPoints = page.getAllProjectMaxKarmaPoints()
            browser.wait(ExpectedConditions.presenceOf(projectKarmaPoints.first()),
                WAIT_TIMEOUT, 'First maximum karma points div was not present')

            projectKarmaPoints.each(function (item) {
                item.getText().then(function (str)
                { expect(validatePropertyAgainstDatabase('maxKarmaPoints', str)).toEqual(true) })
            })
        })

        it('Each project should display the location', () => {
            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                WAIT_TIMEOUT, 'First link was not present')

            let projectIndex: number = 0;
            projectLinks.each(function (item) {
                item.getAttribute('href').then(function (str) {
                    let projectLocation = page.getProjectLocation(projectIndex)
                    let projectKey = GetDisplayedProjectKey(str)
                    projectLocation.getText().then(function (str) {
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
                WAIT_TIMEOUT, 'First link was not present')

            let datePipe: DatePipe = new DatePipe('longDate');
            let projectIndex: number = 0;
            projectLinks.each(function (item) {
                item.getAttribute('href').then(function (str) {
                    let projectDate = page.getProjectDate(projectIndex)
                    let projectKey = GetDisplayedProjectKey(str)
                    projectDate.getText().then(function (str) {
                        expect(str).toMatch(getFormatedTimeInterval(projects[projectKey]['startDateTime'],
                            projects[projectKey]['endDateTime']), 'Start date was not correct displayed')

                    })
                }).then(function () {
                    projectIndex++;
                })
            })
        })

        it('Each project card should open the project page and see the title', () => {
            let projectLinks = page.getListOfProjectLinks();
            browser.wait(ExpectedConditions.presenceOf(projectLinks.first()),
                WAIT_TIMEOUT, 'First link was not present')

            projectLinks.count().then(function (projectsNo) {
                for (let i = 0; i < projectsNo; i++) {
                    let projectKey: string;
                    let currentProjectLink = page.getProjectLink(i)
                    browser.wait(ExpectedConditions.presenceOf(currentProjectLink),
                        WAIT_TIMEOUT, 'Link ' + i + ' was not present').then(function () {
                            currentProjectLink.getAttribute('href').then(function (str) {
                                page.getProjectTitle(currentProjectLink).click().then(function () {
                                    browser.wait(ExpectedConditions.urlContains('/project'),
                                        WAIT_TIMEOUT, 'Link to project did not open')
                                        .then(function () {
                                            browser.getCurrentUrl().then(function (url) {
                                                projectKey = GetDisplayedProjectKey(url)
                                                let projectPage = new ProjectSingleOppPage()
                                                let projectTitle = projectPage.getProjectTitleElement();
                                                browser.wait(ExpectedConditions.presenceOf(projectTitle),
                                                    WAIT_TIMEOUT, 'Title of project ' + projectKey + ' was not present')
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
                        })

                }
            })
        })
    }

})