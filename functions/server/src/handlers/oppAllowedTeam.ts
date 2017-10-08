import { admin } from '../firebase-functions-env'
import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
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
