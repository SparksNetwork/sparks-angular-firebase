import { defineSupportCode } from 'cucumber'

import { urlContains, elementContainsText } from './micro/expects'
import { navigateTo, clickElement, clickElementContainingText } from './micro/actions'

defineSupportCode( ({Given, Then, When}) => {

  When(/^I go to the home page$/, () => {
    return navigateTo('/')
  })

  When(/^I go to the get-involved page for the project with key "(.*)"$/, key => {
    return navigateTo(`/get-involved/${key}`)
  })

  When(/^I go to the get-involved page for project "(.*)" and opportunity "(.*)"$/, (project, opp) => {
    return navigateTo(`/get-involved/${project}/opp/${opp}`)
  })

  When(/^I click on the home page project item for "(.*)"$/, {timeout: 10 * 1000}, text => {
    return clickElementContainingText('a.project-item', text)
  })

  When(/^I click on the get-involved opportunity item for "(.*)"$/, text => {
    return clickElementContainingText('.opp-item a', text)
  })

  When(/^I click on the get-involved join button$/, () => {
    return clickElement('project-actionbar-opp-join a.btn')
  })

  When(/^I select "(.*)" from the opportunity navigation$/, text => {
    return clickElement('#dropdownMenuOpportunity')
      .then(() => clickElementContainingText('.dropdown-menu a', 'Crew Lead'))
  })

  Then(/^I should be on the get-involved page for "(.*)"$/, {timeout: 10 * 1000}, text => {
    return urlContains('/get-involved')
      .then(() => elementContainsText('.project-title', text))
  })

  Then(/^I should be on the get-involved page for "(.*)" looking at the "(.*)" opportunity$/, {timeout: 10 * 1000}, (project, opp) => {
    return urlContains('/get-involved')
      .then(() => elementContainsText('.page-title', project))
      .then(() => elementContainsText('.opp-head h2', opp))
  })

  Then(/^I should see "(.*)" in the home page project list$/, text => {
    return elementContainsText('home-all-projects', text)
  })

})
