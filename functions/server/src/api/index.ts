import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyparser from 'body-parser'
import * as cors from 'cors'

import { sharedMoment } from '../../../universal/sharedMoment'

console.log('functions config', functions.config().firebase)
admin.initializeApp(functions.config().firebase)

import {
  BaseCollection,
  BasePaths,
  BaseHandler,
  routeHandler,
} from '../../../lib/firebase-universal/server'

const app = express();
app.use(cors({origin: true}))
app.route('**/moment')
  .get((req, res) => { res.status(200).send(sharedMoment().toString())})

import {
  ProjectPaths,
  ProjectCollection,
} from '../../../universal/domain/project'

class ProjectHandler extends BaseHandler {
  public async post(req, res, next) {
    console.log('do something extra')
    return super.post(req, res, next)
  }
}

app.use(routeHandler(
  new ProjectHandler(
    '/project',
    new ProjectCollection(admin.database().ref('/project')),
  )))

export const api = functions.https.onRequest((req, res) => {
  // NOTE: You need to add a trailing slash to the root URL becasue of this issue: https://github.com/firebase/firebase-functions/issues/27
  // without trailing "/", req.path = null, req.url = null
  // won't match to your app.get('/', ...) route
  // open issue: https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) { req.url = `/${req.url}` }
  return app(req, res)
});
