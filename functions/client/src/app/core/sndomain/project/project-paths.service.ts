import { Injectable } from '@angular/core';

import { BasePaths } from '../../../../../../lib/firebase-universal/client'

@Injectable()
export class ProjectPaths extends BasePaths {
  firebase = '/project'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'
}
