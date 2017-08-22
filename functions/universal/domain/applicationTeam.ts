import { IsNotEmpty } from 'class-validator/decorator/decorators'
import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'

import {
    BaseCollection,
    Database,
} from '../../lib/firebase-universal/shared'

import { logErrors } from '../logger/logger'

// any methods here will be available on both client and server
export class ApplicationTeamCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/applicationTeam',
            firebase: '/applicationTeam'
        })
    }

    public byAppKey(key: string) {
        return this.by('appKey', key)
    }
}

export class ApplicationTeam {
    @IsNotEmpty()
    @Expose()
    public $key: string

    @IsNotEmpty()
    teamKey: string;

    @IsNotEmpty()
    appKey: string;

    question: string;
    answer: string;
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const applicationTeamTransform = (input: object) =>
    transformAndValidate<ApplicationTeam>(ApplicationTeam, input, validateOpt)
        .catch(logErrors)

export const applicationTeamsTransform = (input: object[]) =>
    transformAndValidate<ApplicationTeam>(ApplicationTeam, input, validateOpt)
        .catch(logErrors)
