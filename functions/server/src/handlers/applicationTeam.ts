import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
  Database,
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
