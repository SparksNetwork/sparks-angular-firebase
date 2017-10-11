import { defineSupportCode } from 'cucumber'
import { browser, element, by, ExpectedConditions as EC, Key } from 'protractor'
import { setData, setUsers, updateData, signOut, signIn, createUserAndProfile } from '../../../firebase'
import * as sleep from 'sleep-promise'

import { populateFields, clickElement, clickNthElement, navigateTo } from '../micro/actions'
import {} from '../micro/expects'
defineSupportCode( ({Given, Then, When}) => {

  When(/^I click on the (.*) link in the "(.*)" putsbox inbox$/, (ordinal, email) => {
    return browser.get(`http://preview.putsbox.com/p/${email}/last`)
      .then(() => clickNthElement('a', ordinal))
  })
})
