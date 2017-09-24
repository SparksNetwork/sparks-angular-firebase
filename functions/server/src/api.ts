import 'reflect-metadata';
import { functions } from './firebase-functions-env'
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
  TeamHandler,
  OppAllowedTeamHandler,
} from './handlers'

try {
  console.log('trying emulator environment')
  const envCode = process.env['ANGULAR_ENV']
  console.log('environment:' + envCode)
  console.log(__dirname)
  const serviceAccount = require(`../../../firebaseAdminCredentials.${envCode}.json`)
  const env = require(`../../client/src/environments/environment.${envCode}.ts`).environment
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: env.firebase.databaseURL
  })
  console.log('emulator environment')
} catch (err) {
  console.log('could not use emulator environment:', err)
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
app.use(routeHandler(new TeamHandler()))
app.use(routeHandler(new OppAllowedTeamHandler()))

export const api = functions.https.onRequest((req, res) => {
  // NOTE: You need to add a trailing slash to the root URL becasue of this issue: https://github.com/firebase/firebase-functions/issues/27
  // without trailing "/", req.path = null, req.url = null
  // won't match to your app.get('/', ...) route
  // open issue: https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) { req.url = `/${req.url}` }
  return app(req, res)
});
