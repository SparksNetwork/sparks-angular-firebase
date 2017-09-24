import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import {
  BaseHandler,
  Database,
} from '../../../lib/firebase-universal/server'

import {
  // ProjectPaths,
  OppAllowedTeamCollection,
} from '../../../universal/domain/oppAllowedTeam'

export class OppAllowedTeamHandler extends BaseHandler {
  constructor() {
    super(
      '/oppAllowedTeam',
      new OppAllowedTeamCollection(admin.database())
    )
  }
}
