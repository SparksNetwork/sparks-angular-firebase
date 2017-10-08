import { defineSupportCode } from 'cucumber'
import { browser, ExpectedConditions } from 'protractor'

defineSupportCode( ({Given, Then, When}) => {

  Given(/^I go to "(.*)"$/, (url) => {
    // Given('I go to "{url}"', (url) => {
    browser.get(url)
  })

  Then(/^I should be on "(.*)"$/, (url) => {
    return browser.wait(
      ExpectedConditions.urlContains(url),
    )
  })

})
