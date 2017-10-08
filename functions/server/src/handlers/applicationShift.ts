import { admin } from '../firebase-functions-env'
import { Request, Response, NextFunction } from 'express'

import {
  BaseHandler,
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
