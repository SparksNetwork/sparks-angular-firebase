import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import {
  BaseHandler,
  Database,
} from '../../../lib/firebase-universal/server'

import {
  // ProjectPaths,
  TeamCollection,
} from '../../../universal/domain/team'

export class TeamHandler extends BaseHandler {
  constructor() {
    super(
      '/team',
      new TeamCollection(admin.database())
    )
  }
}
