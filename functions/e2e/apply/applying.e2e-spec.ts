import { browser, element, by, ExpectedConditions } from 'protractor'
import { setData, setUsers, signOut, signIn } from '../firebase'
import { USER_VERIFIED_NO_PROFILE, USER_VERIFIED_PROFILE } from '../fixtures/users'

fdescribe('Applying to projects', () => {
  beforeEach(done => {
    browser.waitForAngularEnabled(false)
    setUsers()
      .then(() => setData('/', require('../fixtures/fully-loaded.json')))
      .then(done)
  })

  describe('a logged-out user with no profile', () => {

    beforeEach(done => {
      browser.get('/')
        .then(signOut)
        .then(done)
    })

    it('requires you to login before you can start the process', () => {
      browser.get('/apply/KPC1/answer-question')
      browser.wait(ExpectedConditions.urlContains('/auth/%2Fapply%2FKPC1%2Fanswer-question/signin'))
      element(by.css('#signin-with-email')).click()
      browser.wait(ExpectedConditions.urlContains('/auth/%2Fapply%2FKPC1%2Fanswer-question/signin/email'))
      element(by.css('#email')).sendKeys('sd@mailinator.com')
      element(by.css('#password')).sendKeys('testtest')
      element(by.css('#signin')).click()
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/complete-profile'))
      expect(true).toBeTruthy()
    })

  })

  describe('a logged-in user with no profile', () => {

    beforeEach(done => {
      browser.get('/')
        .then(() => signIn(USER_VERIFIED_NO_PROFILE.email, USER_VERIFIED_NO_PROFILE.password))
        .then(done)
    })

    it('makes you fill out your profile before proceeding', () => {
      browser.get('/apply/KPC1/answer-question')
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/complete-profile'))
      expect(true).toBeTruthy()
    })

  })

  describe('a logged-in user with a profile', () => {

    beforeEach(done => {
      browser.get('/')
        .then(() => signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password))
        .then(done)
    })

    it('takes you directly to the opportunity question', () => {
      browser.get('/apply/KPC1/answer-question')
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'))
      expect(true).toBeTruthy()
    })

  })

})
