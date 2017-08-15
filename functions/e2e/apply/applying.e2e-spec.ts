import 'jasmine' // to clear lint errors
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

  beforeEach(done => {
    signOut()
      .then(done)
  })

  describe('a logged-out user with no profile', () => {

    it('requires you to login before you can complete your profile', () => {
      browser.get('/apply/KPC1/answer-question')
      browser.wait(ExpectedConditions.urlContains('/auth/%2Fapply%2FKPC1%2Fanswer-question/signin'))
      element(by.css('#signin-with-email')).click()
      browser.wait(ExpectedConditions.urlContains('/auth/%2Fapply%2FKPC1%2Fanswer-question/signin/email'))
      element(by.css('#email')).sendKeys(USER_VERIFIED_NO_PROFILE.email)
      element(by.css('#password')).sendKeys(USER_VERIFIED_NO_PROFILE.password)
      element(by.css('#signin')).click()
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/complete-profile'))
      element(by.css('#legalName')).sendKeys('Stephen DeBaun')
      element(by.css('#preferredName')).sendKeys('Stevo')
      element(by.css('#phoneNumber')).sendKeys('8053129100')
      element(by.css('#birthday')).sendKeys('10251974')
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#next'))))
      element(by.css('#next')).click()
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'))
      expect(true).toBeTruthy()
    })

  })

  describe('a logged-in user with no profile', () => {

    beforeEach(done => {
      signIn(USER_VERIFIED_NO_PROFILE.email, USER_VERIFIED_NO_PROFILE.password)
        .then(done)
    })

    it('makes you fill out your profile before proceeding', () => {
      browser.get('/apply/KPC1/answer-question')
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/complete-profile'))
      element(by.css('#legalName')).sendKeys('Stephen DeBaun')
      element(by.css('#preferredName')).sendKeys('Stevo')
      element(by.css('#phoneNumber')).sendKeys('8053129100')
      element(by.css('#birthday')).sendKeys('10251974')
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#next'))))
      element(by.css('#next')).click()
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'))
      expect(true).toBeTruthy()
    })

  })

  describe('a logged-in user with a profile', () => {

    beforeEach(done => {
      signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password)
        .then(done)
    })

    it('takes you directly to the opportunity question', () => {
      browser.get('/apply/KPC1/answer-question')
      browser.wait(ExpectedConditions.urlContains('/apply/KPC1/answer-question'))
      expect(true).toBeTruthy()
    })

  })

})
