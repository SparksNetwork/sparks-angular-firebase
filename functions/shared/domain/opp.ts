import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'

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

export class Opp {
  @Expose()
  public $key: string

  public projectKey: string
  public icon: string
  public contribValue: number
  public benefitValue: number
  public title: string

  get discount(): number {
    return 1 - (this.contribValue / this.benefitValue)
  }
}

// leave this as promise for now bc im pretty sure thats how the server will use it
export const OppTransform = (input: object | object[]) =>
  transformAndValidate<Opp>(Opp, input)

// i did not realize that rxjs.mergemap spoke promise
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/promises.md
// export const OppTransformObservable = (input: object | object[]) => {
//   return Observable.fromPromise(
//     transformAndValidate<Opp>(Opp, input)
//   )
// }
