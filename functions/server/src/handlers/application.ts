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
}
