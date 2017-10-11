import { defineSupportCode } from 'cucumber'
import { browser, element, by, ExpectedConditions as EC, Key } from 'protractor'
import { setData, setUsers, updateData, signOut, signIn } from '../../../firebase'
import * as sleep from 'sleep-promise'

import { populateFields, clickElement } from '../micro/actions'

defineSupportCode( ({Given, Then, When}) => {

  When(/^I click on "(.*)"$/, locator => {
    return browser
      .wait(EC.elementToBeClickable(element(by.css(locator))))
      .then(() => element(by.css(locator)).click())
  })

  When(/^I click on the "(.*)" element containing "(.*)"$/, (locator, text) => {
    const finder = element(by.cssContainingText(locator, text))
    return browser
      .wait(EC.elementToBeClickable(finder))
      .then(() => finder.click())
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
    return populateFields(table.rowsHash())
  })

  When(/^I fill out these fields and click "(.*)"$/, (locator, table) => {
    return populateFields(table.rowsHash())
      .then(() => clickElement(locator))
  })

})
