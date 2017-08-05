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

// we have two transform functions for type safety, not sure why overloading isnt working see below
export function OppTransform(input: object): Promise<Opp> {
  return transformAndValidate<Opp>(Opp, input)
}

export function OppsTransform(input: object[]): Promise<Opp[]> {
  return transformAndValidate<Opp>(Opp, input)
}

// not sure why this doesnt work, think it is because mergeMap passes any?
// export function OppTransform(input: object): Promise<Opp>;
// export function OppTransform(input: object[]): Promise<Opp[]>;
// export function OppTransform(input: object | object[]): Promise<Opp | Opp[]> {
//   return transformAndValidate<Opp>(Opp, input)
// }

