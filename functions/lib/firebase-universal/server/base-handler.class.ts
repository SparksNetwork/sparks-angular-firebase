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
    const newRef = await this.collection.ref.push(req.body)
    return res.status(200).send(JSON.stringify(newRef.key))
  }

  public async put(req: Request, res: Response, next: NextFunction): Promise<Response> {
    await this.collection.ref.child(req.params['key']).set(req.body)
    return res.status(200).send(JSON.stringify({}))
  }

  public async patch(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const obj = req.body
    Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k])
    await this.collection.ref.child(req.params['key']).update(obj)
    return res.status(200).send(JSON.stringify({}))
  }

  public async del(req: Request, res: Response, next: NextFunction): Promise<Response> {
    await this.collection.ref.child(req.params['key']).remove()
    return res.status(200).send(JSON.stringify({}))
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
    // does not populate req.body when req uses PATCH verb
    // .patch(handler.patch.bind(handler))
    .post(handler.patch.bind(handler))
    .delete(handler.del.bind(handler))

  return router
}
