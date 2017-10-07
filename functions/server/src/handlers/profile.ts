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
    return res.sendStatus(403)
  }

  public async del(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return res.sendStatus(403)
  }
}
