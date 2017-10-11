import { validate } from 'jsonschema'
import { initialize, admin } from '../server/src/firebase-functions-env'
initialize(false)

const data = require('../e2e/fixtures/fully-loaded.json')
const schema = require('../../database.model.json')

const { valid, errors } = validate(data, schema)

if (valid) {
  console.log('Loading data into firebase...')
  admin.database().ref('/').remove()
    .then(() => admin.database().ref('/').set(data))
    .then(() => {
      console.log('Data loaded!')
      process.exit()
    })
} else {
  console.log('Validation errors in test data')
  console.log(JSON.stringify(errors, null, 2))
}
