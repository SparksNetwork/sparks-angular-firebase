import * as express from 'express';
import * as functions from 'firebase-functions';

import { sharedMoment } from '../../../shared/sharedMoment'

const app = express();
app.route('**/moment')
  .get((req,res) => { res.status(200).send(sharedMoment().toString())})

export const api = functions.https.onRequest((req,res) => {
  // NOTE: You need to add a trailing slash to the root URL becasue of this issue: https://github.com/firebase/firebase-functions/issues/27
  // without trailing "/", req.path = null, req.url = null
  // won't match to your app.get('/', ...) route
  // open issue: https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) { req.url = `/${req.url}` }
  return app(req,res)
});
