import { defineSupportCode } from 'cucumber'

import { urlContains, elementContainsText } from './micro/expects'
import { navigateTo, clickElement, clickElementContainingText } from './micro/actions'

import { shared } from './generic/shared'

defineSupportCode( ({Given, Then, When}) => {

  When(/^I go to my application page for the project "(.*)"$/, key => {
    return navigateTo(`/your-application/${key}${shared.lastUid}`)
  })

})
