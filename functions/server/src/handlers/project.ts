import * as admin from 'firebase-admin'
import {
  BaseHandler,
} from '../../../lib/firebase-universal/server'

import {
  ProjectPaths,
  ProjectCollection,
} from '../../../universal/domain/project'

export class ProjectHandler extends BaseHandler {
  constructor() {
    super(
      '/project',
      new ProjectCollection(admin.database().ref('/project'))
    )
  }

  public async post(req, res, next) {
    console.log('do something extra')
    return super.post(req, res, next)
  }
}
