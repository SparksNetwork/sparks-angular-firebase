import * as firebaseFunctions from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'

export let functions: {
  https: any,
  config: any,
  database: any,
} = firebaseFunctions

export const admin = firebaseAdmin

export const initialize = () => {
  try { // this will only work in local environment
    const envCode = process.env['ANGULAR_ENV']
    const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
    console.log('FIREBASE-ENV: running locally with environment', envCode)

    functions = require('firebase-functions-local')({
      config: env.firebase,
      port: 5000,
    })
    console.log('FIREBASE-FUNCTIONS: replaced with firebase-functions-local emulator')

    const serviceAccount = require(`../../../firebaseAdminCredentials.${envCode}.json`)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: env.firebase.databaseURL
    })
    console.log('FIREBASE-ADMIN: initialized with local credentials for ', env.firebase.databaseURL)

  } catch (err) {
    console.log('FIREBASE-ENV: running in the cloud')
    console.log('FIREBASE-FUNCTIONS: running in cloud')
    admin.initializeApp(functions.config().firebase)
    console.log('FIREBASE-ADMIN: cloud credentials', functions.config().firebase)
  }

  // try { // this will only work in local environment
  //   console.log('FIREBASE-FUNCTIONS: trying local emulator environment with firebase-functions-local')
  //   const envCode = process.env['ANGULAR_ENV']
  //   const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
  //   functions = require('firebase-functions-local')({
  //     config: env.firebase,
  //     port: 5000,
  //   })
  // } catch (err) {
  //   console.log('FIREBASE-FUNCTIONS: running in cloud')
  // }

  // try {
  //   console.log('FIREBASE-ADMIN: trying local credentials')
  //   const envCode = process.env['ANGULAR_ENV']
  //   console.log('FIREBASE-ADMIN: environment:' + envCode)
  //   console.log(__dirname)
  //   const serviceAccount = require(`../../../firebaseAdminCredentials.${envCode}.json`)
  //   const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
  //   admin.initializeApp({
  //     credential: admin.credential.cert(serviceAccount),
  //     databaseURL: env.firebase.databaseURL
  //   })
  //   console.log('FIREBASE-ADMIN: local credentials')
  // } catch (err) {
  //   console.log('FIREBASE-ADMIN: could not use local credentials:', err)
  //   admin.initializeApp(functions.config().firebase)
  //   console.log('FIREBASE-ADMIN: cloud credentials', functions.config().firebase)
  // }
}

