import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsDefined, IsDateString } from 'class-validator'
import { IsDateGreaterThan } from '../validation/IsDateGreaterThan'

import {
    BaseCollection, Database, validateOpt,
} from '../../lib/firebase-universal/shared'

// any methods here will be available on both client and server
export class ShiftCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/shift',
            firebase: '/shift'
        })
    }

    public byTeamKey(key: string) {
        return this.by('teamKey', key)
    }
}

export class Shift {
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    public $key: string

    @IsDateString()
    @IsDefined()
    @IsNotEmpty()
    public startDateTime: string

    @IsDateString()
    @IsDefined()
    @IsNotEmpty()
    @IsDateGreaterThan('startDateTime', {
        message: 'endDateTime must be greater than startDateTime'
    })
    public endDateTime: string

    @IsDefined()
    @IsNotEmpty()
    public teamKey: string

    @IsDefined()
    @IsNotEmpty()
    public teamTitle: string

    public teamIcon: string
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const shiftTransform = (input: object) => transformAndValidate<Shift>(Shift, input, validateOpt)
export const shiftsTransform = (input: object[]) => transformAndValidate<Shift>(Shift, input, validateOpt)
