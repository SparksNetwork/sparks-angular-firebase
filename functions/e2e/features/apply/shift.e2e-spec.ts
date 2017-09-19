import 'jasmine'
import { ShiftPage } from "../../po/apply.shift.po";
import { browser, ExpectedConditions } from "protractor/built";
import { setUsers, setData, signOut, signIn, updateData } from "../../firebase";
import { USER_VERIFIED_PROFILE } from "../../fixtures/users";
import { confirmPage } from '../helper-functions/navigation/navigation-functions';
import { ApplicationStages } from "../../fixtures/applications/application-stages";
import { LC_ACCEPTED_APP } from "../../fixtures/applications/application";

const waitTimeout = 5000

fdescribe('Apply-Choose-Shifts: verified user with complete profile', () => {
    let shiftPage: ShiftPage


    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const shifts = fullyLoaded['shift']
    const applicationTeam = require('../../fixtures/applications/application-team.json')

    beforeAll(done => {
        shiftPage = new ShiftPage()
        let g: string = 'Accepted'
        browser.waitForAngularEnabled(false)
        ApplicationStages.userWithApplicationTeams(LC_ACCEPTED_APP, applicationTeam)
            .then(() => browser.get('/apply/LC1/application/LC_ACCEPTED_APP/shift'))
            //.then(() => updateData('/project', g))
            .then(() => browser.get('/apply/LC1/application/LC_ACCEPTED_APP/shift'))
            .then(done)
    })


    it('It should be able to see all the available shifts ', function () {
        let titles = shiftPage.getShiftsTitle()
        browser.wait(ExpectedConditions.presenceOf(titles.first()), waitTimeout,
            'First shift title was not present')

        // let shiftIndex: number = 0;
        // titles.each(function (item) {
        //     item.getText().then(function (titleString) {
        //         expect(titleString).toMatch(fullyLoaded['shift']['KPC' + shiftIndex.toString()])

        //     })

        // }).then(function () {
        //     shiftIndex++;
        // })

        let select = shiftPage.getDateSelect()
        browser.wait(ExpectedConditions.presenceOf(select), waitTimeout, 'No select');



    })



})