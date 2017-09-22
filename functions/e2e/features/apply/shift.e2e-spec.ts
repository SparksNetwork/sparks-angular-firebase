import 'jasmine'
import { ShiftPage } from '../../po/apply.shift.po';
import { browser, ExpectedConditions, ElementArrayFinder } from 'protractor/built';
import { setUsers, setData, signOut, signIn, updateData } from '../../firebase';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { confirmPage } from '../helper-functions/shared';
import { ApplicationStages } from '../../fixtures/applications/application-stages';
import { LC_USER_VERIFIED_PROFILE } from '../../fixtures/applications/application';
import { SignInPage } from '../../po/sign-in.po';
import { getDateIntervalForShift, WAIT_TIMEOUT } from '../helper-functions/shared';


describe('Apply-Choose-Shifts: verified user with complete profile', () => {
    let shiftPage: ShiftPage
    let signInPage: SignInPage


    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const shifts = fullyLoaded['shift']


    beforeAll(done => {
        shiftPage = new ShiftPage()
        signInPage = new SignInPage()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(() => setData('/application', LC_USER_VERIFIED_PROFILE))
            .then(() => setData('/applicationTeam', require('../../fixtures/applications/application-team.json')))
            .then(done)
    })

    describe('Exploring shifts page', () => {
        beforeAll(done => {
            shiftPage.navigateTo()
                .then(() => confirmPage('/auth/%2Fapply%2FLC1%2Fshift/signin', '', 'Sign-In',
                    'first'))
                .then(() => signInPage.getEmailAddressInput())
                .then((input) => input.sendKeys(USER_VERIFIED_PROFILE.email))
                .then(() => signInPage.getPasswordInput())
                .then((input) => input.sendKeys(USER_VERIFIED_PROFILE.password))
                .then(() => {
                    let button = signInPage.getSignInButton()
                    browser.wait(ExpectedConditions.elementToBeClickable(button), WAIT_TIMEOUT,
                        'Sign-in button it was not clickable')
                    return button.click()
                })
                .then(() => confirmPage('/apply/LC1/shift', '', 'Choose-shift', 'first'))
                .then(done)
        })

        it('It should be able to see all the available shifts ', function () {
            testAllShifts();
        })

        it('In the select for Data filter there should be all the start dates of shifts', () => {
            let select = shiftPage.getDateSelect()
            browser.wait(ExpectedConditions.presenceOf(select), WAIT_TIMEOUT,
                'Filter by date was not present')

            let options = shiftPage.getAllOptions(select)
            browser.wait(ExpectedConditions.presenceOf(options.first()), WAIT_TIMEOUT,
                'First option was not present')

            let isPresent: boolean = false;
            for (let key in shifts) {
                if (key.toString().startsWith('KPC')) {
                    let timeInterval = getDateIntervalForShift(shifts[key]['startDateTime'],
                        shifts[key]['endDateTime'])

                    isPresent = false;
                    options.each(function (item) {
                        item.getText().then((shiftInterval) => {
                            shiftInterval = shiftInterval.split(',')[0];
                            if (timeInterval.startsWith(shiftInterval)) {
                                isPresent = true;
                            }
                        })


                    }).then(function () {
                        expect(isPresent).toBe(true, 'Date for shift with key ' + key.toString() + ' was not present');
                    })
                }
            }
        })

        it('In the select for Teams filter there should be all the titles of teams', () => {
            let select = shiftPage.getTeamSelect()
            browser.wait(ExpectedConditions.presenceOf(select), WAIT_TIMEOUT,
                'Filter by team was not present')

            let options = shiftPage.getAllOptions(select)
            browser.wait(ExpectedConditions.presenceOf(options.first()), WAIT_TIMEOUT,
                'First option was not present')

            let isPresent: boolean = false;
            for (let key in shifts) {
                if (key.toString().startsWith('KPC')) {
                    isPresent = false;
                    options.each(function (item) {
                        item.getText().then((teamName) => {
                            if (teamName === shifts[key]['teamTitle']) {
                                isPresent = true;
                            }
                        })

                    }).then(function () {
                        expect(isPresent).toBe(true, 'Team for shift with key ' + key.toString() + ' was not present');
                    })
                }
            }
        })

        it('It should be able to filter by date', () => {
            let select = shiftPage.getDateSelect()
            browser.wait(ExpectedConditions.presenceOf(select), WAIT_TIMEOUT,
                'Filter by team was not present')
            select.click()

            let dateOption = shiftPage.getOption(select, 2);
            browser.wait(ExpectedConditions.presenceOf(dateOption), WAIT_TIMEOUT,
                'Second option was not present')
            dateOption.click()

            let titles = shiftPage.getAllShifts()
            browser.wait(ExpectedConditions.presenceOf(titles.first()), WAIT_TIMEOUT,
                'First shift title was not present')

            dateOption.getText().then((selectedDate) => {
                selectedDate = selectedDate.split(',')[0];

                let noFilteredShifts: number = 0;
                for (let key in shifts) {
                    if (key.toString().startsWith('KPC') &&
                        getDateIntervalForShift(shifts[key]['startDateTime'],
                            shifts[key]['endDateTime']).startsWith(selectedDate)) {
                        noFilteredShifts++;
                        loopThroughFilteredTeams(titles, key)
                    }
                }
                titles.count().then((nr) => {
                    expect(nr).toEqual(noFilteredShifts, 'The number of shifts after filtering was not correct')
                })
            })

        })

        it('It should be able to reset Date filter by selecting  All Dates', () => {
            let select = shiftPage.getDateSelect()
            browser.wait(ExpectedConditions.presenceOf(select), WAIT_TIMEOUT,
                'Filter by date was not present')
            select.click()

            let dateOption = shiftPage.getOption(select, 0);
            browser.wait(ExpectedConditions.presenceOf(dateOption), WAIT_TIMEOUT,
                'First option was not present')
            dateOption.click()

            testAllShifts()
        })

        it('It can be able to filter by team', () => {
            let select = shiftPage.getTeamSelect()
            browser.wait(ExpectedConditions.presenceOf(select), WAIT_TIMEOUT,
                'Filter by team was not present')
            select.click()

            let teamOption = shiftPage.getOption(select, 2);
            browser.wait(ExpectedConditions.presenceOf(teamOption), WAIT_TIMEOUT,
                'Second option was not present')
            teamOption.click()

            let titles = shiftPage.getAllShifts()
            browser.wait(ExpectedConditions.presenceOf(titles.first()), WAIT_TIMEOUT,
                'First shift title was not present')

            teamOption.getText().then((selectedTeamTitle) => {

                let noFilteredShifts: number = 0;
                for (let key in shifts) {
                    if (key.toString().startsWith('KPC') &&
                        shifts[key]['teamTitle'] === selectedTeamTitle) {
                        noFilteredShifts++;
                        loopThroughFilteredTeams(titles, key)
                    }
                }
                titles.count().then((nr) => {
                    expect(nr).toEqual(noFilteredShifts, 'The number of shifts after filtering was not correct')
                })

            })

        })

        it('It can reset Team filter by selecting  All Teams', () => {
            let select = shiftPage.getTeamSelect()
            browser.wait(ExpectedConditions.presenceOf(select), WAIT_TIMEOUT,
                'Filter by date was not present')
            select.click()

            let dateOption = shiftPage.getOption(select, 0);
            browser.wait(ExpectedConditions.presenceOf(dateOption), WAIT_TIMEOUT,
                'First option was not present')
            dateOption.click()

            testAllShifts()
        })

        it('It can be able to filter by date and team', () => {
            let dateSelect = shiftPage.getDateSelect()
            browser.wait(ExpectedConditions.presenceOf(dateSelect), WAIT_TIMEOUT,
                'Filter by team was not present')
            dateSelect.click()

            let dateOption = shiftPage.getOption(dateSelect, 2);
            browser.wait(ExpectedConditions.presenceOf(dateOption), WAIT_TIMEOUT,
                'Second option was not present')
            dateOption.click()

            let teamSelect = shiftPage.getTeamSelect()
            browser.wait(ExpectedConditions.presenceOf(teamSelect), WAIT_TIMEOUT,
                'Filter by team was not present')
            teamSelect.click()

            let teamOption = shiftPage.getOption(teamSelect, 2);
            browser.wait(ExpectedConditions.presenceOf(teamOption), WAIT_TIMEOUT,
                'Second option was not present')
            teamOption.click()

            let titles = shiftPage.getAllShifts()
            browser.wait(ExpectedConditions.presenceOf(titles.first()), WAIT_TIMEOUT,
                'First shift title was not present')

            teamOption.getText().then((selectedTeamTitle) => {
                dateOption.getText().then((selectedDate) => {
                    selectedDate = selectedDate.split(',')[0];

                    let noFilteredShifts: number = 0;
                    for (let key in shifts) {
                        if (key.toString().startsWith('KPC') &&
                            shifts[key]['teamTitle'] === selectedTeamTitle &&
                            getDateIntervalForShift(shifts[key]['startDateTime'],
                                shifts[key]['endDateTime']).startsWith(selectedDate)) {
                            noFilteredShifts++;
                            loopThroughFilteredTeams(titles, key)
                        }
                    }
                    titles.count().then((nr) => {
                        expect(nr).toEqual(noFilteredShifts, 'The number of shifts after filtering was not correct')
                    })
                })
            })

        })

        it('Clear All will delete all filters', () => {
            let clearAll = shiftPage.getClearAllButton()
            browser.wait(ExpectedConditions.presenceOf(clearAll), WAIT_TIMEOUT,
                'ClearAll button was not present')
            clearAll.click()

            testAllShifts()
        })




    })

    function loopThroughFilteredTeams(titles: ElementArrayFinder, key: string) {
        let isPresent = false;
        titles.each(function (item) {
            shiftPage.getShiftsTitle(item).getText()
                .then((title) => {
                    shiftPage.getShiftTimeInterval(item).getText()
                        .then((time) => {
                            let timeInterval = getDateIntervalForShift(shifts[key]['startDateTime'],
                                shifts[key]['endDateTime'])

                            if (timeInterval === time && title === shifts[key]['teamTitle']) {
                                isPresent = true;
                            }
                        })
                })
        }).then(function () {
            expect(isPresent).toBe(true, 'Shift with key ' + key.toString() + ' was not present');
        })
    }

    function testAllShifts() {
        let titles = shiftPage.getAllShifts()
        browser.wait(ExpectedConditions.presenceOf(titles.first()), WAIT_TIMEOUT,
            'First shift title was not present')

        for (let key in shifts) {
            if (key.toString().startsWith('KPC')) {
                loopThroughFilteredTeams(titles, key)
            }
        }
    }

})