import { IsNotEmpty, IsDefined, IsEnum, IsDateString } from 'class-validator'
import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'

import {
    BaseCollection,
    Database,
    validateOpt,
} from '../../lib/firebase-universal/shared'

import { list } from '../../lib/firebase-angular-observables';

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
    Incomplete = 'Incomplete',
    Pending = 'Pending',
    Accepted = 'Accepted',
    Canceled = 'Canceled'
}

export enum ApplicationStepFinished {
    Answer = 'Answer',
    Team = 'Team'
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
    oppQuestion: string;

    @IsNotEmpty()
    oppAnswer: string;

    @IsEnum(ApplicationStatus)
    status: ApplicationStatus;

    @IsEnum(ApplicationStepFinished)
    step?: ApplicationStepFinished

    @IsDateString()
    @IsDefined()
    createdOn: string;

    @IsDateString()
    submittedOn?: string;

    @IsDateString()
    acceptedOn?: string;

    @IsDateString()
    canceledOn?: string;
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const applicationTransform = (input: object) =>
    transformAndValidate<Application>(Application, input, validateOpt)

export const applicationsTransform = (input: object[]) =>
    transformAndValidate<Application>(Application, input, validateOpt)
