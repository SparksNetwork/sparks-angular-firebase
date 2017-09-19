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

console.log('functions config', functions.config().firebase)
admin.initializeApp(functions.config().firebase)

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
