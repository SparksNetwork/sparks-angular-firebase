import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsDefined } from 'class-validator'
import { IsDateString } from 'class-validator';

import {
    BaseCollection, Database,
} from '../../lib/firebase-universal/shared'

// any methods here will be available on both client and server
export class ApplicationShiftCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/applicationShift',
            firebase: '/applicationShift'
        })
    }

    public byAppKey(key: string) {
        return this.by('appKey', key)
    }

    public compoundKey(projectKey: string, profileKey: string) {
        return `${projectKey}${profileKey}`;
    }
}

export class ApplicationShift {
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    public $key: string

    @IsDefined()
    @IsNotEmpty()
    public appKey: string

    @IsDefined()
    @IsNotEmpty()
    public shiftKey: string

    @IsDateString()
    @IsDefined()
    @IsNotEmpty()
    public joinedOn: string
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const applicationShiftTransform = (input: object) => transformAndValidate<ApplicationShift>(ApplicationShift, input)
export const applicationShiftsTransform = (input: object[]) => transformAndValidate<ApplicationShift>(ApplicationShift, input)
