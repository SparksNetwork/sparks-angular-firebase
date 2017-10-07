import * as firebaseFunctions from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'

export let functions: {
  https: any,
  config: any,
  database: any,
} = firebaseFunctions

export const admin = firebaseAdmin

export const initialize = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('FIREBASE-FUNCTIONS: running in local emulator environment with firebase-functions-local')
    const envCode = process.env['ANGULAR_ENV']
    const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
    functions = require('firebase-functions-local')({
      config: env.firebase,
      port: 5000,
    })
  }

  try {
    console.log('FIREBASE-ADMIN: trying local credentials')
    const envCode = process.env['ANGULAR_ENV']
    console.log('FIREBASE-ADMIN: environment:' + envCode)
    console.log(__dirname)
    const serviceAccount = require(`../../../firebaseAdminCredentials.${envCode}.json`)
    const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: env.firebase.databaseURL
    })
    console.log('FIREBASE-ADMIN: local credentials')
  } catch (err) {
    console.log('FIREBASE-ADMIN: could not use local credentials:', err)
    admin.initializeApp(functions.config().firebase)
    console.log('FIREBASE-ADMIN: cloud credentials', functions.config().firebase)
  }
}

