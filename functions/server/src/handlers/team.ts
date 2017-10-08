import { admin } from '../firebase-functions-env'

import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
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
