import { admin } from '../firebase-functions-env'

import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
  OppCollection,
} from '../../../universal/domain/opp'

export class OppHandler extends BaseHandler {
  constructor() {
    super(
      '/opp',
      new OppCollection(admin.database())
    )
  }
}
