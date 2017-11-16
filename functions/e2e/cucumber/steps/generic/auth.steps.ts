import { defineSupportCode } from 'cucumber'
import { browser, element, by, ExpectedConditions as EC, Key } from 'protractor'
import { setData, setUsers, updateData, signOut, signIn, createUserAndProfile } from '../../../firebase'
import * as sleep from 'sleep-promise'

import { populateFields, clickElement } from '../micro/actions'
import { urlContains } from '../micro/expects'

// import { World } from './world'
import { shared } from './shared'

defineSupportCode( ({Given, Then, When, setWorldConstructor}) => {
  // setWorldConstructor(World)

  Given(/^I'm signed out$/, () => {
    return browser.get('/').then(signOut)
  })

  Given(/^I sign out$/, () => {
    return signOut()
  })

  Given(/^I'm signed in as "(.*)" with password "(.*)"$/, (username, password) => {
    return browser.get('/').then(() => signIn(username, password))
  })

  Given(/^I'm signed in as a user with the following information:$/, table => {
    const user = table.rowsHash()
    return createUserAndProfile(user)
      .then(uid => {
        console.log('set lastUid', uid)
        shared.lastUid = uid
      })
      .then(() => browser.get('/'))
      .then(() => signIn(user.email, user.password))
  })

  When(/^I submit the email and password form with "(.*)" and "(.*)"$/, (email: string, password: string) => {
    return populateFields({'#email': email, '#password': password})
      .then(() => clickElement('#signin'))
  })

  Then(/^I should be on the join page$/, () => {
    return Promise.all([
      urlContains('/auth/'),
      urlContains('/join'),
    ])
  })

  Then(/^I should be on the signin page$/, () => {
    return Promise.all([
      urlContains('/auth/'),
      urlContains('/signin'),
    ])
  })

  Then(/^I should be on the signup with email page$/, () => {
    return Promise.all([
      urlContains('/auth/'),
      urlContains('/email-signup'),
    ])
  })

})
