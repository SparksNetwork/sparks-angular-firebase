import {
  BasePaths,
  BaseCollection,
} from '../../lib/firebase-universal/shared'

export class OppPaths extends BasePaths {
  firebase = '/opp'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/opp'
  // firebase = '/Projects'
  // api = 'https://sparksnetwork-6de8b.firebaseio.com/Projects'
}

// any methods here will be available on both client and server
export class OppCollection extends BaseCollection {
  public byProjectKey(key: string) {
    return this.by('projectKey', key)
  }
}
