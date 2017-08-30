import { IsNotEmpty, IsDefined, IsEnum } from 'class-validator'
import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'

import {
    BaseCollection,
    Database,
} from '../../lib/firebase-universal/shared'

import { list } from "../../lib/firebase-angular-observables";

// any methods here will be available on both client and server
export class ApplicationCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/application',
            firebase: '/application'
        })
    }

    public byProfileKey(profileKey: string) {
        return this.by('profileKey', profileKey)
    }

    public byProjectProfileKey(projectKey: string, profileKey: string) {
        return this.by('projectProfileKey', this.generateProjectProfileKey(projectKey, profileKey))
    }

    public generateProjectProfileKey(projectKey: string, profileKey: string) {
        return `${projectKey}-${profileKey}`;
    }
}

export enum ApplicationStatus {
    Incomplete = "Incomplete",
    Pending = "Pending",
    Accepted = "Accepted",
    Canceled = "Canceled"
}

export class Application {
    @IsNotEmpty()
    @Expose()
    @IsDefined()
    public $key: string

    @IsNotEmpty()
    @IsDefined()
    oppKey: string;

    @IsNotEmpty()
    @IsDefined()
    profileKey: string;

    @IsNotEmpty()
    @IsDefined()
    projectKey: string;

    @IsNotEmpty()
    @IsDefined()
    projectProfileKey: string;

    oppQuestion: string;
    oppAnswer: string;

    @IsEnum(ApplicationStatus)
    status: ApplicationStatus
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const applicationTransform = (input: object) =>
    transformAndValidate<Application>(Application, input, validateOpt)

export const applicationsTransform = (input: object[]) =>
    transformAndValidate<Application>(Application, input, validateOpt)
