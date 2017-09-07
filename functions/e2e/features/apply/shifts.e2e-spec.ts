import 'jasmine'
import { browser, ExpectedConditions } from 'protractor/built';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { ApplicationStages } from '../../fixtures/applications/application-stages';
import { APPLICATION_ACCEPTED, APPLICATION_NOT_ACCEPTED } from '../../fixtures/applications/application';

const waitTimeout = 5000;

describe('Apply-Choosing-Shifts: application accepted', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const shifts = fullyLoaded['shift']
    const applicationTeam = require('../../fixtures/applications/application-team.json')

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        ApplicationStages.userWithApplicationTeams(APPLICATION_ACCEPTED, applicationTeam)
            .then(() => browser.get('/apply/KPC1/application/APPLICATION_ACCEPTED/shift'))
            .then(done)
    })

    it('should initialize db', () => { expect(true).toBe(true) })
})

describe('Apply-Choosing-Shifts: application not accepted', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const shifts = fullyLoaded['shift']
    const applicationTeam = require('../../fixtures/applications/application-team.json')

    beforeAll(done => {
        browser.waitForAngularEnabled(false);
        ApplicationStages.userWithApplicationTeams(APPLICATION_NOT_ACCEPTED, applicationTeam)
            .then(() => browser.get('/apply/KPC1/application/APPLICATION_NOT_ACCEPTED/shift'))
            .then(done)
    })

    it('should be redirected to Application-pending Page.', () => {
        browser.wait(ExpectedConditions.urlContains('/application-pending'),
            waitTimeout,
            'User was not taken to Application-pending Page when the application status is different than ACCEPTED.')
    })
})
