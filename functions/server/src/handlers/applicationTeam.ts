import { admin } from '../firebase-functions-env'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
  ApplicationTeamCollection,
} from '../../../universal/domain/applicationTeam'

export class ApplicationTeamHandler extends BaseHandler {
  constructor() {
    const coll = new ApplicationTeamCollection(admin.database())
    super(
      coll.paths.api,
      coll,
    )
  }
}
