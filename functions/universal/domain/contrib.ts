import { Expose } from "class-transformer";
import { IsNotEmpty, IsEnum, IsInt, IsDefined } from 'class-validator/decorator/decorators'
import { transformAndValidate } from "class-transformer-validator";

import {
  BasePaths,
  BaseCollection,
} from '../../lib/firebase-universal/shared'

export class ContribPaths extends BasePaths {
  firebase = '/contrib'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/contrib'
  // firebase = '/Projects'
  // api = 'https://sparksnetwork-6de8b.firebaseio.com/Projects'
}

export enum ContribType { 
   Shift,
   PrePayment,
   Deposit,
   Donation
}

export class Contrib {
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    public $key: string;

    @IsDefined()
    @IsNotEmpty()
    oppKey: string;

    @IsEnum(ContribType)
    type: ContribType;

    @IsDefined()
    title: string;

    @IsDefined()
    description: string;

    icon?: string;

    @IsInt()
    shiftMinLength?: number;

    @IsInt()
    shiftMaxLength?: number;
}


// any methods here will be available on both client and server
export class ContribCollection extends BaseCollection {
  public byOppKey(key: string) {
    return this.by('oppKey', key)
  }
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const contribTransform = (input: object) => transformAndValidate<Contrib>(Contrib, input, validateOpt)
export const contribsTransform = (input: object[]) => transformAndValidate<Contrib>(Contrib, input, validateOpt)
