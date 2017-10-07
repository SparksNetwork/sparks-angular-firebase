import { admin } from '../firebase-functions-env'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
  ApplicationCollection,
} from '../../../universal/domain/application'

export class ApplicationHandler extends BaseHandler {
  constructor() {
    const coll = new ApplicationCollection(admin.database())
    super(
      coll.paths.api,
      coll,
    )
  }

  public async post(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const compoundKey = this.collection.compoundKey(req.body['projectKey'], req.body['profileKey'])
    const data = req.body
    let returned = await this.collection.ref.child(compoundKey).once('value')
      .then(ref => ref.val() && ref.key)
    if (!returned) {
      data.createdOn = new Date().toISOString()
      returned = await this.collection.ref.child(compoundKey).set(data).then(() => compoundKey)
      console.log('new', returned)
    } else {
      console.log('existing', returned)
    }
    return res.status(200).send(JSON.stringify(returned))
  }
}
