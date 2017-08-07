import {
  BasePaths,
  BaseCollection,
} from '../../lib/firebase-universal/shared'

export class BenefitPaths extends BasePaths {
  firebase = '/benefit'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/benefit'
  // firebase = '/Projects'
  // api = 'https://sparksnetwork-6de8b.firebaseio.com/Projects'
}

// any methods here will be available on both client and server
export class BenefitCollection extends BaseCollection {
  public byOppKey(key: string) {
    return this.by('oppKey', key)
  }
}
