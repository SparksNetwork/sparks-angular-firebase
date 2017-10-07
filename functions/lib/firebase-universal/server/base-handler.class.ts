import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as bodyparser from 'body-parser'
import * as cors from 'cors'

import { BaseCollection } from '../../../lib/firebase-universal/shared'

export class BaseHandler {
  constructor(
    public path: string,
    public collection: BaseCollection,
  ) {}

  public async post(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(this.path, 'POST', JSON.stringify(req.body, null, 2))
    // const returned = await (this.collection.ref.push(req.body) as firebase.database.ThenableReference).then(ref => ref.key)
    const returned = await this.collection.ref.push(req.body) // .then(ref => ref.key)
    return res.status(200).send(JSON.stringify(returned.key))
  }

  public async put(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(this.path, 'PUT', req.params['key'], JSON.stringify(req.body, null, 2))
    const returned = await this.collection.ref.child(req.params['key']).set(req.body).then(() => ({}))
    return res.status(200).send(JSON.stringify(returned))
  }

  public async patch(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(this.path, 'PATCH', req.params['key'], JSON.stringify(req.body, null, 2))
    const obj = req.body
    Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k])
    const returned = await this.collection.ref.child(req.params['key']).update(obj).then(() => ({}))
    // const returned = await (this.collection.ref.child(req.params['key']).update() as Promise<any>)
      // .then(() => ({}))
    return res.status(200).send(JSON.stringify(returned))
  }

  public async del(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(this.path, 'DEL', req.params['key'])
    const returned = await this.collection.ref.child(req.params['key']).remove().then(() => ({}))
    return res.status(200).send(JSON.stringify(returned))
  }
}

export function routeHandler(handler: BaseHandler) {
  const router = express.Router()
  router.use(bodyparser.json())
  router.use(cors({origin: '*'}))

  router.route(`**${handler.path}`)
    .post(handler.post.bind(handler))

  router.route(`**${handler.path}/:key`)
    .put(handler.put.bind(handler))
    // because firebase-functions http handler in server environment
    // does not populate req.body with PATCH method
    // .patch(handler.patch.bind(handler))
    .post(handler.patch.bind(handler))
    .delete(handler.del.bind(handler))

  return router
}
