import 'jasmine' // to clear lint errors
import { browser, element, by, ExpectedConditions } from 'protractor'
import { setData, updateData, setUsers } from '../../firebase'
import { GuestHomePage } from "../../po/guest-home.po";

const waitTimeout = 5000;

describe('Guest home page: user is not logged in', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const projects = fullyLoaded['project']
    let page: GuestHomePage;

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => page.navigateTo())
            .then(done)
        page = new GuestHomePage();
    })



    describe('exploring the project page', () => {

        function validatePropertyAgainstDatabase(propertyName: string, displayedValue: string): boolean {
            for (let key in projects) {
                if (projects[key][propertyName].toString() == displayedValue) {
                    return true;
                }
            }
            return false;
        }

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
                        if (str.indexOf(key.toString()) >= 0) {
                            isPresent = true;
                        }
                    })
                }).then(function(){
                    expect(isPresent).toBe(true);
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


    })






})

