import {
  BasePaths,
  BaseCollection,
} from '../../lib/firebase-universal/shared'

export class ProjectPaths extends BasePaths {
  firebase = '/project'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'
  // firebase = '/Projects'
  // api = 'https://sparksnetwork-6de8b.firebaseio.com/Projects'
}

// any methods here will be available on both client and server
export class ProjectCollection extends BaseCollection {}
