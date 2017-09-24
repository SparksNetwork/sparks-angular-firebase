import * as firebaseFunctions from 'firebase-functions'

export let functions: {
  https: any,
  config: any,
  database: any,
} = firebaseFunctions

// let functions = require('firebase-functions')

if (process.env.NODE_ENV !== 'production') {
  const envCode = process.env['ANGULAR_ENV']
  const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
  functions = require('firebase-functions-local')({
    config: env.firebase,
    port: 3001,
  })
}
console.log('functions', functions)
// module.exports = functions


