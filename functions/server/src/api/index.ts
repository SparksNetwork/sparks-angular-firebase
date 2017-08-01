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
  .put((req, res, next) => {
    res.status(200).send('OK')
  })
  .patch((req, res, next) => {
    res.status(200).send('OK')
  })
  .delete((req, res, next) => {
    res.status(200).send('OK')
  })

async function post(req, res, next) {
  console.log('New Project', JSON.stringify(req.body, null, 2))
  const returned = await admin.database().ref('/project').push(req.body).then(ref => ref.key)
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
