import { defineSupportCode } from 'cucumber'
import { deleteUsers, setData, setUsers, updateData, addRecord } from '../../../firebase'

// import { World } from './world'
import { shared } from './shared'

defineSupportCode( ({Given, Then, When, setWorldConstructor}) => {

  // setWorldConstructor(World)

  Given(/^I've overwritten "(.*)" with "(.*)" fixtures$/, {timeout: 10000}, (firebasePath, fixturePath) => {
    return setData(firebasePath, require('../../../fixtures/' + fixturePath))
  })

  Given(/^I've updated "(.*)" with "(.*)" fixtures$/, (firebasePath, fixturePath) => {
    return updateData(firebasePath, require('../../fixtures/' + fixturePath))
  })

  Given(/^I've preloaded all users$/, () => {
    return setUsers()
  })

  Given(/^I've deleted all users$/, () => {
    return deleteUsers()
  })

  Given(/^an? "(.*)" exists with the following values:$/, (collection, table) => {
    return addRecord(collection, table.rowsHash())
  })

  Given(/^an? "(.*)" exists with key "(.*)" and the following values:$/, (collection, key, table) => {
    return setData(`${collection}/${key}`, table.rowsHash())
  })

  Given(/^an "application" exists for the current user with the following values:$/, (table) => {
    console.log('reading lastUid', shared.lastUid)
    const values = table.rowsHash()
    values.profileKey = shared.lastUid
    return setData(`/application/${values.projectKey}${values.profileKey}`, values)
  })

  Given(/^an "applicationTeam" exists for the current user and project "(.*)" with the following values:$/, (projectKey, table) => {
    const values = table.rowsHash()
    values.appKey = `${projectKey}${shared.lastUid}`
    return addRecord('applicationTeam', values)
  })

})
