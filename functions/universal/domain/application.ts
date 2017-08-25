import { IsNotEmpty } from 'class-validator/decorator/decorators'
import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'

import {
    BaseCollection,
    Database,
} from '../../lib/firebase-universal/shared'

import { logErrors } from '../logger/logger'
import { IsDefined, IsEnum } from "class-validator";

// any methods here will be available on both client and server
export class ApplicationCollection extends BaseCollection {
    constructor(public db: Database) {
        super(db, {
            api: '/application',
            firebase: '/application'
        })
    }

    public generateProjectProfileKey(projectKey: string, profileKey: string) {
        return `${projectKey}-${profileKey}`;
    }
}

export enum ApplicationStatus {
    Incomplete = "Incomplete",
    Pending = "Pending",
    Applied = "Applied",
    Accepted = "Accepted"
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
        .catch(logErrors)

export const applicationsTransform = (input: object[]) =>
    transformAndValidate<Application>(Application, input, validateOpt)
        .catch(logErrors)
