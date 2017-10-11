import { defineSupportCode } from 'cucumber'
import { browser, element, by, ExpectedConditions as EC, Key } from 'protractor'
import { setData, setUsers, updateData, signOut, signIn } from '../../../firebase'
import * as sleep from 'sleep-promise'

defineSupportCode( ({Given, Then, When}) => {

  Given(/^I go to "(.*)"$/, (url) => {
    return browser.get(url)
  })

  When(/^I clear my cookies$/, () => {
    return browser.manage().deleteAllCookies()
  })

  Then(/^I should not see "(.*)" in "(.*)"$/, {timeout: 30 * 1000}, (text, locator) => {
    return browser
      .wait(EC.not(EC.textToBePresentInElement(element(by.css(locator)), text))
    )
  })

  Then(/^I should see "(.*)" in "(.*)"$/, {timeout: 30 * 1000}, (text, locator) => {
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
