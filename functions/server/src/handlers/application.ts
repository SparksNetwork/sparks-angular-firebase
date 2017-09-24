import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
  Database,
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
    const generateProjectProfileKey = this.collection.generateProjectProfileKey(req.body['projectKey'], req.body['profileKey'])
    const data = req.body
    let returned = await this.collection.ref.child(generateProjectProfileKey).once('value').then(ref => ref.val() && ref.key)
    console.log('existing', returned)
    if (!returned) {
      data.createdOn = new Date().toISOString()
      returned = await this.collection.ref.child(generateProjectProfileKey).set(data).then(() => generateProjectProfileKey)
      console.log('new', returned)
    }
    return res.status(200).send(JSON.stringify(returned))
  }
}
