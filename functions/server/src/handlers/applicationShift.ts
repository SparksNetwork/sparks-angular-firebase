import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
  Database,
} from '../../../lib/firebase-universal/server'

import {
  ApplicationShiftCollection,
} from '../../../universal/domain/applicationShift'

export class ApplicationShiftHandler extends BaseHandler {
  constructor() {
    const coll = new ApplicationShiftCollection(admin.database())
    super(
      coll.paths.api,
      coll,
    )
  }
}
