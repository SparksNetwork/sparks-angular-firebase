import { Expose } from 'class-transformer'
import { IsNotEmpty, IsEnum, IsInt, IsDefined } from 'class-validator/decorator/decorators'
import { transformAndValidate } from 'class-transformer-validator'

import {
  BaseCollection,
  Database,
} from '../../lib/firebase-universal/shared'

// any methods here will be available on both client and server
export class ContribCollection extends BaseCollection {
  constructor(public db: Database) {
    super(db, {
      api: '/contrib',
      firebase: '/contrib'
    })
  }

  public byOppKey(key: string) {
    return this.by('oppKey', key)
  }
}

export enum ContribType {
   Shift = "Shift",
   PrePayment = "PrePayment",
   Deposit = "Deposit",
   Donation = "Donation"
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

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const contribTransform = (input: object) => transformAndValidate<Contrib>(Contrib, input, validateOpt)
export const contribsTransform = (input: object[]) => transformAndValidate<Contrib>(Contrib, input, validateOpt)
