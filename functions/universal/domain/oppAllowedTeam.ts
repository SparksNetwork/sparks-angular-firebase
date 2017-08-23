import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsDefined, ValidateNested } from 'class-validator'

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
  @IsDefined()
  @IsNotEmpty()
  public $key: string

  @IsDefined()
  @IsNotEmpty()
  public oppKey: string

  @IsDefined()
  @IsNotEmpty()
  public teamKey: string
  
  @ValidateNested()
  @Type(() => Team)
  public team: Team
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const oppAllowedTeamTransform = (input: object) =>
  transformAndValidate<OppAllowedTeam>(OppAllowedTeam, input)
    //.catch(logErrors)

export const oppAllowedTeamsTransform = (input: object[]) =>
  transformAndValidate<OppAllowedTeam>(OppAllowedTeam, input)
    //.catch(logErrors)
