import { validate } from 'jsonschema'
import * as admin from 'firebase-admin'

function getEnvironment() {
  const envName = process.env['ANGULAR_ENV'] || 'qa'
  console.log('*** running in angular environment', envName)
  return require('../client/src/environments/environment.' + envName).environment
}

const environment = getEnvironment()

const serviceAccount = require('../../' + environment.firebaseAdminCredentialFilename)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: environment.firebase.databaseURL,
});

const data = require('../e2e/fixtures/fully-loaded.json')
const schema = require('../../database.model.json')

const { valid, errors } = validate(data, schema)

if (valid) {
  console.log('Loading data into firebase...')
  admin.database().ref('/').set(data)
    .then(() => {
      console.log('Data loaded!')
      process.exit()
    })
} else {
  console.log('Validation errors in test data')
  console.log(JSON.stringify(errors, null, 2))
}
