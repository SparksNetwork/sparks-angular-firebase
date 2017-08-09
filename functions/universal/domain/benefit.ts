import { IsNotEmpty, IsEnum } from 'class-validator/decorator/decorators'
import { transformAndValidate } from "class-transformer-validator";
import { Expose } from "class-transformer";

import {
    BasePaths,
    BaseCollection,
} from '../../lib/firebase-universal/shared'
import { logErrors } from "../logger/logger";


export class BenefitPaths extends BasePaths {
    firebase = '/benefit'
    api = 'http://localhost:5002/sparks-development-sd/us-central1/api/benefit'
}

export enum BenefitType {
    FoodTicket,
    EventTicket,
    Gifts,
    FoodDrink,
    HelpNonProfit
}

export class Benefit {
    @IsNotEmpty()
    @Expose()
    public $key: string

    @IsNotEmpty()
    oppKey: string;

    @IsEnum(BenefitType)
    type: BenefitType;

    title: string;

    description: string;

    icon?: string;
}

// any methods here will be available on both client and server
export class BenefitCollection extends BaseCollection {
  public byOppKey(key: string) {
    return this.by('oppKey', key)
  }
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const benefitTransform = (input: object) =>
    transformAndValidate<Benefit>(Benefit, input, validateOpt)
        .catch(logErrors)

export const benefitsTransform = (input: object[]) =>
    transformAndValidate<Benefit>(Benefit, input, validateOpt)
        .catch(logErrors)
