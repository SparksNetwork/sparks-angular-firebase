import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsDefined } from 'class-validator'
import { IsISO8601 } from "class-validator";

import {
    BaseCollection, Database,
} from '../../lib/firebase-universal/shared'

// any methods here will be available on both client and server
export class ShiftCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/shift',
            firebase: '/shift'
        })
    }
}

export class Shift {
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    public $key: string

    @IsISO8601()
    @IsDefined()
    @IsNotEmpty()
    public startDate: string

    @IsISO8601()
    @IsDefined()
    @IsNotEmpty()
    public endDate: string

    @IsDefined()
    @IsNotEmpty()
    public teamKey: string

    @IsDefined()
    @IsNotEmpty()
    public teamTitle: string
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const teamShiftTransform = (input: object) => transformAndValidate<Shift>(Shift, input)
export const teamShiftsTransform = (input: object[]) => transformAndValidate<Shift>(Shift, input)
