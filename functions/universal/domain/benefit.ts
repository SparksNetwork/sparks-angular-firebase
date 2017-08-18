import { IsNotEmpty, IsEnum } from 'class-validator/decorator/decorators'
import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'

import {
    BaseCollection,
    Database,
} from '../../lib/firebase-universal/shared'

import { logErrors } from '../logger/logger'

// any methods here will be available on both client and server
export class BenefitCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/benefit',
            firebase: '/benefit'
        })
    }

    public byOppKey(key: string) {
        return this.by('oppKey', key)
    }
}

export enum BenefitType {
    FoodTicket = "FoodTicket",
    EventTicket = "EventTicket",
    Gifts = "Gifts",
    FoodDrink = "FoodDrink",
    HelpNonProfit = "HelpNonProfit"
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

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const benefitTransform = (input: object) =>
    transformAndValidate<Benefit>(Benefit, input, validateOpt)
        .catch(logErrors)

export const benefitsTransform = (input: object[]) =>
    transformAndValidate<Benefit>(Benefit, input, validateOpt)
        .catch(logErrors)
