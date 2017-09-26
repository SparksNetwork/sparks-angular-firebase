import { IsNotEmpty, IsDefined, IsDateString } from 'class-validator'
import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'

import {
    BaseCollection,
    Database,
    validateOpt,
} from '../../lib/firebase-universal/shared'

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

    public compoundKey(projectKey: string, profileKey: string) {
        return `${projectKey}-${profileKey}`;
    }
}

export class ApplicationTeam {
    @IsNotEmpty()
    @Expose()
    @IsDefined()
    public $key: string

    @IsNotEmpty()
    @IsDefined()
    teamKey: string;

    @IsNotEmpty()
    @IsDefined()
    appKey: string;

    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    answer: string;

    @IsDateString()
    @IsDefined()
    joinedOn: string;
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const applicationTeamTransform = (input: object) =>
    transformAndValidate<ApplicationTeam>(ApplicationTeam, input, validateOpt)

export const applicationTeamsTransform = (input: object[]) =>
    transformAndValidate<ApplicationTeam>(ApplicationTeam, input, validateOpt)
