import { defineSupportCode } from 'cucumber'
import { deleteUsers, setData, setUsers, updateData, addRecord } from '../../../firebase'

defineSupportCode( ({Given, Then, When}) => {

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

})
