import 'jasmine' // to clear lint errors
import { browser, element, by, ExpectedConditions } from 'protractor'
import { setData, updateData, setUsers } from '../../firebase'
import { USER_VERIFIED_NO_PROFILE, USER_VERIFIED_PROFILE } from '../../fixtures/users'

describe('User browsing projects', () => {
  beforeEach(done => {
    browser.waitForAngularEnabled(false)
    setUsers()
      .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
      .then(done)
  })

  describe('with an invalid project', () => {

    const invalidProject = require('../../fixtures/project/invalid.json')
    const invalidProjectKey = Object.keys(invalidProject)[0]

    beforeEach(done => {
      updateData('/project', invalidProject)
        .then(done)
    })

    it('shows a sorry modal on the home page', () => {
      browser.get(`/`)
      browser.wait(ExpectedConditions.visibilityOf(element(by.css('#modal-sorry'))))
      expect(element(by.css('#modal-sorry')).getText()).toContain('Sorry')
    })

    it('shows a sorry modal on a specific project page', () => {
      browser.get(`/project/${invalidProjectKey}`)
      browser.wait(ExpectedConditions.visibilityOf(element(by.css('#modal-sorry'))))
      expect(element(by.css('#modal-sorry')).getText()).toContain('Sorry')
    })

  })

})
