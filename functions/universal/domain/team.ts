import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'

import {
    BasePaths,
    BaseCollection,
} from '../../lib/firebase-universal/shared'

export class TeamPaths extends BasePaths {
    firebase = '/teams'
    api = 'http://localhost:5002/sparks-development-sd/us-central1/api/teams'
}

export class Team {
    @Expose()
    public $key: string

    public oppKey: string;
    public title: string
    public description: string
    public icon: string
}

// any methods here will be available on both client and server
export class OppCollection extends BaseCollection {
    public byProjectKey(key: string) {
        return this.by('teamKey', key)
    }
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const oppTransform = (input: object) => transformAndValidate<Team>(Team, input)
export const oppsTransform = (input: object[]) => transformAndValidate<Team>(Team, input)


