import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyparser from 'body-parser'
import * as cors from 'cors'

import { sharedMoment } from '../../../shared/sharedMoment'

console.log('functions config', functions.config().firebase)
admin.initializeApp(functions.config().firebase)

const app = express();
app.use(cors({origin: true}))
app.route('**/moment')
  .get((req,res) => { res.status(200).send(sharedMoment().toString())})

const apiRoot = '/project'

const router = express.Router()
router.use(bodyparser.json())
router.use(cors({origin: true}))

router.route(`**${apiRoot}`)
  .post(post)

router.route(`**${apiRoot}/:key`)
  .put(put)
  .patch(patch)
  .delete(del)

async function post(req, res, next) {
  console.log('Create/Post Project', JSON.stringify(req.body, null, 2))
  const returned = await admin.database().ref('/project').push(req.body).then(ref => ref.key)
  return res.status(200).send(JSON.stringify(returned))
}

async function put(req: express.Request, res, next) {
  console.log('Replace/Put Project', JSON.stringify(req.body, null, 2))
  console.log('key', req.params['key'])
  const returned = await admin.database().ref('/project').child(req.params['key']).set(req.body).then(() => { return {} })
  return res.status(200).send(JSON.stringify(returned))
}

async function patch(req: express.Request, res, next) {
  console.log('Update/Patch Project', JSON.stringify(req.body, null, 2))
  console.log('key', req.params['key'])
  const obj = req.body
  Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k])
  const returned = await admin.database().ref('/project').child(req.params['key']).update(obj).then(() => { return {} })
  return res.status(200).send(JSON.stringify(returned))
}

async function del(req: express.Request, res, next) {
  console.log('Delete Project')
  console.log('key', req.params['key'])
  const returned = await admin.database().ref('/project').child(req.params['key']).remove().then(() => { return {} })
  return res.status(200).send(JSON.stringify(returned))
}

app.use(router)

export const api = functions.https.onRequest((req,res) => {
  // NOTE: You need to add a trailing slash to the root URL becasue of this issue: https://github.com/firebase/firebase-functions/issues/27
  // without trailing "/", req.path = null, req.url = null
  // won't match to your app.get('/', ...) route
  // open issue: https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) { req.url = `/${req.url}` }
  return app(req,res)
});
