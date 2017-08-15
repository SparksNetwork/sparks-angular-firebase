import { browser } from 'protractor'
import * as firebaseAdmin from 'firebase-admin'
import { USERS } from './fixtures/users'

function getEnvironment() {
  const envName = process.env['ANGULAR_ENV'] || 'qa'
  console.log('*** running in angular environment', envName)
  return require('../client/src/environments/environment.' + envName).environment
}

const environment = getEnvironment()

const serviceAccount = require('../../' + environment.firebaseAdminCredentialFilename)

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: environment.firebase.databaseURL,
});

export const db = firebaseAdmin.database()

export const auth = firebaseAdmin.auth()

export function setData(firebasePath, data) {
  db.ref(firebasePath).set(data)
}

export function setUsers(users = USERS) {
  return Promise.all(
    users.map(user =>
      auth.deleteUser(user.uid)
      .catch(err => { console.log('user did not exist, thats ok')})
      .then(() => auth.createUser(user))
    )
  )
}

export function signOut() {
  return browser.executeAsyncScript(`
var callback = arguments[arguments.length - 1]
return window['auth']
  .signOut()
  .then(function() { callback() })
`)
}

export function signIn(email: string, password: string) {
  return browser.executeAsyncScript(`
var callback = arguments[arguments.length - 1]
return window['auth']
  .signInWithEmailAndPassword('${email}', '${password}')
  .then(function() { callback() })
`
  )

}
