import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsEnum, ValidationError, IsDateString, ValidateNested, IsNumber, IsInt, IsUrl } from 'class-validator'

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

export class Opp {
  @Expose()
  @IsNotEmpty()
  public $key: string;

  @IsNotEmpty()
  public projectKey: string;

  public icon: string;

  @IsNumber()
  public contribValue: number;

  @IsNumber()
  public benefitValue: number;

  @IsNotEmpty()
  public title: string;

  get discount(): number {
    return 1 - (this.contribValue / this.benefitValue)
  }
}

// any methods here will be available on both client and server
export class OppCollection extends BaseCollection {
  public byProjectKey(key: string) {
    return this.by('projectKey', key)
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

