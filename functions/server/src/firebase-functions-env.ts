import * as firebaseFunctions from 'firebase-functions'

export let functions: {
  https: any,
  config: any,
  database: any,
} = firebaseFunctions

if (process.env.NODE_ENV !== 'production') {
  console.log('running functions in local emulator environment with firebase-functions-local')
  const envCode = process.env['ANGULAR_ENV']
  const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
  functions = require('firebase-functions-local')({
    config: env.firebase,
    port: 5000,
  })
}
