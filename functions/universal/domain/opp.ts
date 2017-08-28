import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsEnum, ValidationError, IsDateString, ValidateNested, IsNumber, IsInt, IsUrl, IsDefined } from 'class-validator'

import {
  BaseCollection,
  Database,
} from '../../lib/firebase-universal/shared'


// any methods here will be available on both client and server
export class OppCollection extends BaseCollection {
  constructor(public db: Database) {
    super(db, {
      api: '/opp',
      firebase: '/opp'
    })
  }

  public byProjectKey(key: string) {
    return this.by('projectKey', key)
  }
}

export class Opp {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  public $key: string;

  @IsDefined()
  @IsNotEmpty()
  public projectKey: string;

  public icon: string;

  @IsNumber()
  public contribValue?: number;

  @IsNumber()
  public benefitValue?: number;

  @IsDefined()
  @IsNotEmpty()
  public title: string;

  public question: string;

  get discount(): number {
    return 1 - (this.contribValue / this.benefitValue)
  }
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const oppTransform = (input: object) => transformAndValidate<Opp>(Opp, input, validateOpt)
export const oppsTransform = (input: object[]) => transformAndValidate<Opp>(Opp, input, validateOpt)

// not sure why this doesnt work, think it is because mergeMap passes any?
// when i do .mergeMap<object, Opp> it works
// export function OppTransform(input: object): Promise<Opp>;
// export function OppTransform(input: object[]): Promise<Opp[]>;
// export function OppTransform(input: object | object[]): Promise<Opp | Opp[]> {
//   return transformAndValidate<Opp>(Opp, input)
// }

