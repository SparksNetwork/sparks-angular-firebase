import { admin } from '../firebase-functions-env'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
  ProfileCollection,
} from '../../../universal/domain/profile'

export class ProfileHandler extends BaseHandler {
  constructor() {
    const coll = new ProfileCollection(admin.database())
    super(
      coll.paths.api,
      coll,
    )
  }

  public async post(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const token = req.body.token
    const decoded = await admin.auth().verifyIdToken(token)
    console.log('decoded', decoded)
    const existing = await this.collection.ref.child(decoded.uid).once('value')
      .then(ref => ref.val() && ref.key)
    if (!existing) {
      let newProfile = {}
      switch (decoded.firebase.sign_in_provider) {
        case 'google.com': newProfile = {
            legalName: decoded.name,
            email: decoded.email,
            photoURL: decoded.picture,
          }
          break
        case 'password': newProfile = {
            email: decoded.email,
          }
          break
      }
      await this.collection.ref.child(decoded.uid).set(newProfile)
    }
    return res.status(200).send(JSON.stringify({}))
  }

  public async del(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return res.sendStatus(403)
  }
}
