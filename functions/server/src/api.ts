import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'

import {
  routeHandler,
} from '../../lib/firebase-universal/server'

import {
  ProjectHandler,
  ProfileHandler,
  ApplicationTeamHandler,
  ApplicationHandler,
  ApplicationShiftHandler,
} from './handlers'

try {
  console.log('trying emulator environment')
  const envCode = process.env['ANGULAR_ENV']
  console.log('environment:' + envCode)
  const serviceAccount = require(`../../../../firebaseAdminCredentials.${envCode}.json`)
  const env = require(`../../client/src/environments/environment.${envCode}.js`).environment
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: env.firebase.databaseURL
  })
  console.log('emulator environment')
} catch (err) {
  admin.initializeApp(functions.config().firebase)
  console.log('cloud environment', functions.config().firebase)
}

const app = express();
app.use(cors({origin: '*'}))

app.use(routeHandler(new ProjectHandler()))
app.use(routeHandler(new ProfileHandler()))
app.use(routeHandler(new ApplicationTeamHandler()))
app.use(routeHandler(new ApplicationShiftHandler()))
app.use(routeHandler(new ApplicationHandler()))

export const api = functions.https.onRequest((req, res) => {
  // NOTE: You need to add a trailing slash to the root URL becasue of this issue: https://github.com/firebase/firebase-functions/issues/27
  // without trailing "/", req.path = null, req.url = null
  // won't match to your app.get('/', ...) route
  // open issue: https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) { req.url = `/${req.url}` }
  return app(req, res)
});
