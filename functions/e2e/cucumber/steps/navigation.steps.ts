import { defineSupportCode } from 'cucumber'
import { browser, element, by, ExpectedConditions as EC } from 'protractor'
import { setData, setUsers, updateData, signOut, signIn } from '../../firebase'

defineSupportCode( ({Given, Then, When}) => {

  Given(/^I've overwritten "(.*)" with "(.*)" fixtures$/, (firebasePath, fixturePath) => {
    return setData(firebasePath, require('../../fixtures/' + fixturePath))
      .then(() => browser.sleep(3000) as PromiseLike<void>)
  })

  Given(/^I've updated "(.*)" with "(.*)" fixtures$/, (firebasePath, fixturePath) => {
    return updateData(firebasePath, require('../../fixtures/' + fixturePath))
    // .then(() => browser.sleep(3000) as PromiseLike<void>)
  })

  Given(/^I've preloaded all users$/, () => {
    return setUsers()
  })

  Given(/^I'm signed out$/, () => {
    return browser.get('/').then(signOut)
  })

  Given(/^I'm signed in as "(.*)" with password "(.*)"$/, (username, password) => {
    return browser.get('/').then(() => signIn(username, password))
  })

  Given(/^I go to "(.*)"$/, (url) => {
    return browser.get(url)
  })

  When(/^I click on "(.*)"$/, locator => {
    return browser
      .wait(EC.elementToBeClickable(element(by.css(locator))))
      .then(() => element(by.css(locator)).click())
  })

  When(/^I click on the (.*) element of "(.*)"$/, (ordinal, locator) => {
    const index = {
      first: 0,
      second: 1,
      third: 2,
      fourth: 3,
      fifth: 4,
    }[ordinal]

    return browser
      .wait(EC.elementToBeClickable(element(by.css(locator))))
      .then(() => element.all(by.css(locator)).get(index).click())
  })

  Then(/^I should see "(.*)" in "(.*)"$/, (text, locator) => {
    return browser
      .wait(EC.textToBePresentInElement(element(by.css(locator)), text)
    )
  })

  Then(/^I should be on "(.*)"$/, (url) => {
    return browser.wait(EC.urlContains(url))
  })

})
