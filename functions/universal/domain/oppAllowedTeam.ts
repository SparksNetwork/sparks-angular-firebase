import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'

import {
  BasePaths,
  BaseCollection,
  Database,
} from '../../lib/firebase-universal/shared'
import { logErrors } from "../logger/logger";

// import { Opp } from './opp'
import { Team } from './team'

export class OppAllowedTeamPaths extends BasePaths {
  firebase = '/oppAllowedTeam'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/oppAllowedTeam'
  // firebase = '/Projects'
  // api = 'https://sparksnetwork-6de8b.firebaseio.com/Projects'
}

export class OppAllowedTeam {
  @Expose()
  public $key: string

  public oppKey: string
  public teamKey: string
  // public opp: Opp
  public team: Team
}

// any methods here will be available on both client and server
export class OppAllowedTeamCollection extends BaseCollection {
  constructor(public db: Database) {
    super(db, {
      api: '/oppAllowedTeam',
      firebase: '/oppAllowedTeam'
    })
  }
  // public byProjectKey(key: string) {
  //   return this.by('projectKey', key)
  // }
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const oppAllowedTeamTransform = (input: object) =>
  transformAndValidate<OppAllowedTeam>(OppAllowedTeam, input)
    .catch(logErrors)

export const oppAllowedTeamsTransform = (input: object[]) =>
  transformAndValidate<OppAllowedTeam>(OppAllowedTeam, input)
    .catch(logErrors)
