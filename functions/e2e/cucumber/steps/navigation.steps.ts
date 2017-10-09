import { defineSupportCode } from 'cucumber'
import { browser, element, by, ExpectedConditions as EC, Key } from 'protractor'
import { setData, setUsers, updateData, signOut, signIn } from '../../firebase'
import * as sleep from 'sleep-promise'

defineSupportCode( ({Given, Then, When}) => {

  Given(/^I've overwritten "(.*)" with "(.*)" fixtures$/, {timeout: 10000}, (firebasePath, fixturePath) => {
    return setData(firebasePath, require('../../fixtures/' + fixturePath))
      // .then(sleep(3000))
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

  Given(/^I sign out$/, () => {
    return signOut()
  })

  Given(/^I'm signed in as "(.*)" with password "(.*)"$/, (username, password) => {
    return browser.get('/').then(() => signIn(username, password))
  })

  Given(/^I go to "(.*)"$/, (url) => {
    return browser.get(url)
  })

  When(/^I clear my cookies$/, () => {
    return browser.manage().deleteAllCookies()
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

  When(/^I fill out the fields$/, (table) => {
    const rows = table.rows() as Array<Array<string>>
    const elementsClickable = rows.map(([locator, input]) =>
      EC.elementToBeClickable(element(by.css(locator)))
    )
    const inputActions = rows.map(([locator, input]) =>
    // element(by.css(locator)).clear()
      // .then(() => element(by.css(locator)).sendKeys(input, Key.TAB)) as PromiseLike<void>
    element(by.css(locator)).click()
      .then(() => element(by.css(locator)).sendKeys(input, Key.TAB)) as PromiseLike<void>
    // element(by.css(locator)).sendKeys(input, Key.TAB) as PromiseLike<void>
        // .then(() => element(by.css(locator)).sendKeys(Key.TAB)) as PromiseLike<void>
    )

    return Promise
      .all(elementsClickable.map(ec => browser.wait(ec)))
      .then(() => inputActions.reduce((prev, cur) => prev.then(() => cur), Promise.resolve()))
      .then(() => browser.waitForAngular())
  })

  Then(/^I should see "(.*)" in "(.*)"$/, (text, locator) => {
    return browser
      .wait(EC.textToBePresentInElement(element(by.css(locator)), text)
    )
  })

  Then(/^I should be on "(.*)"$/, {timeout: 10 * 1000}, (url) => {
    return browser.wait(EC.urlContains(url))
  })

  Then(/^I wait for (.*) seconds$/, {timeout: 60 * 1000}, seconds => {
    return browser.sleep(seconds * 1000)
  })
})
