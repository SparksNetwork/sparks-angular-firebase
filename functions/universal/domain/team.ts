import { Observable } from 'rxjs'
import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'

import {
    BaseCollection,
} from '../../lib/firebase-universal/shared'

// any methods here will be available on both client and server
export class TeamCollection extends BaseCollection {
    public byProjectKey(key: string) {
        return this.by('projectKey', key)
    }
}

export class Team {
    @Expose()
    public $key: string

    public oppKey: string;
    public title: string
    public description: string
    public icon: string
    public question: string
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const teamTransform = (input: object) => transformAndValidate<Team>(Team, input)
export const teamsTransform = (input: object[]) => transformAndValidate<Team>(Team, input)


