import { defineSupportCode } from 'cucumber'

import { urlContains, elementContainsText } from './micro/expects'
import { navigateTo, clickElement, clickElementContainingText } from './micro/actions'

import { shared } from './generic/shared'

defineSupportCode( ({Given, Then, When}) => {

  Then(/^I should be on the organize page for the project "(.*)"$/, {timeout: 10 * 1000}, projectName => {
    return urlContains('/organize')
      .then(() => elementContainsText('snui-header-full', projectName))
  })

})

