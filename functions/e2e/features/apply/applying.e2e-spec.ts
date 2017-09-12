import 'jasmine' // to clear lint errors
import { browser, element, by, ExpectedConditions } from 'protractor'
import { setData, setUsers, signOut, signIn } from '../../firebase'
import { USER_VERIFIED_NO_PROFILE, USER_VERIFIED_PROFILE } from '../../fixtures/users'
import { confirmPage } from "../helper-functions/navigation/navigation-functions";
const waitTimeout = 20000

describe('Apply: user must auth before starting application', () => {
  beforeEach(done => {
    browser.waitForAngularEnabled(false)
    setUsers()
      .then(() => setData('/', require('../../fixtures/fully-loaded.json')))
      .then(done)
  })

  beforeEach(done => {
    browser.get('/')
      .then(signOut)
      .then(done)
  })

  describe('a logged-out user with no profile', () => {

    it('requires you to login before you can complete your profile', () => {
      browser.get('/apply/KPC1/answer-question')

      confirmPage('/auth/%2Fapply%2FKPC1%2Fanswer-question/signin', '', 'Sign-in', 'first', waitTimeout)
      // element(by.css('#signin-with-email')).click()
      // browser.wait(ExpectedConditions.urlContains('/auth/%2Fapply%2FKPC1%2Fanswer-question/signin/email'))
      element(by.css('#email')).sendKeys(USER_VERIFIED_NO_PROFILE.email)
      element(by.css('#password')).sendKeys(USER_VERIFIED_NO_PROFILE.password)
      element(by.css('#signin')).click()

      confirmPage('/apply/KPC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout)

      element(by.css('#legalName')).sendKeys('Stephen DeBaun')
      element(by.css('#preferredName')).sendKeys('Stevo')
      element(by.css('#phoneNumber')).sendKeys('8053129100')
      element(by.css('#birthday')).sendKeys('10251974')
      //click somewhere outside the form, so the form will be validated faster
      element(by.className('question-bar')).click()
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#next'))),
        waitTimeout, 'Next button was not clickable after completing the profile information')
      element(by.css('#next')).click()
      confirmPage('/apply/KPC1/application', '/answer-question', 'Answer-question', 'first', waitTimeout)
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
      confirmPage('/apply/KPC1/complete-profile', '', 'Complete-profile', 'first', waitTimeout)
      element(by.css('#legalName')).sendKeys('Stephen DeBaun')
      element(by.css('#preferredName')).sendKeys('Stevo')
      element(by.css('#phoneNumber')).sendKeys('8053129100')
      element(by.css('#birthday')).sendKeys('10251974')
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('#next'))))
      element(by.css('#next')).click()
      confirmPage('/apply/KPC1/answer-question', '', 'Answer-question', 'first', waitTimeout)
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
      confirmPage('/apply/KPC1/answer-question', '', 'Answer-question', 'first', waitTimeout)
      expect(true).toBeTruthy()
    })

  })

})
