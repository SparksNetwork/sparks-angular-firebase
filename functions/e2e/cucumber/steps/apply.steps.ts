import { defineSupportCode } from 'cucumber'

import { urlContains, elementContainsText } from './micro/expects'
import { navigateTo, clickElement, clickElementContainingText } from './micro/actions'

defineSupportCode( ({Given, Then, When}) => {

  Then(/^I should be on the application question page for "(.*)"$/, {timeout: 10 * 1000}, key => {
    return urlContains(`/apply/${key}/answer-question`)
  })

  Then(/^I should be on the application complete profile page for "(.*)"$/, {timeout: 10 * 1000}, key => {
    return urlContains(`/apply/${key}/complete-profile`)
  })

})
