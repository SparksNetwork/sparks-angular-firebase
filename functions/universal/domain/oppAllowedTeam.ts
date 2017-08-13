import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'

import {
  BaseCollection,
  Database,
} from '../../lib/firebase-universal/shared'
import { logErrors } from "../logger/logger";

// import { Opp } from './opp'
import { Team } from './team'

// any methods here will be available on both client and server
export class OppAllowedTeamCollection extends BaseCollection {
  constructor(public db: Database) {
    super(db, {
      api: '/oppAllowedTeam',
      firebase: '/oppAllowedTeam'
    })
  }
}

export class OppAllowedTeam {
  @Expose()
  public $key: string

  public oppKey: string
  public teamKey: string
  // public opp: Opp
  public team: Team
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const oppAllowedTeamTransform = (input: object) =>
  transformAndValidate<OppAllowedTeam>(OppAllowedTeam, input)
    .catch(logErrors)

export const oppAllowedTeamsTransform = (input: object[]) =>
  transformAndValidate<OppAllowedTeam>(OppAllowedTeam, input)
    .catch(logErrors)
