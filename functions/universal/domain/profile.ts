import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'
// import { IsNotEmpty, IsEnum, ValidationError, IsDateString, ValidateNested, IsNumber, IsInt, IsUrl, IsDefined } from 'class-validator'

import {
  BaseCollection,
  Database,
} from '../../lib/firebase-universal/shared'

// uncomfortable about including these as we haven't started developing any features with them yet
// import { Location } from './location'
// import { ImageRef } from './imageRef'
// import { Organizer } from './organizer'
import { logErrors } from '../logger/logger'

// any methods here will be available on both client and server
export class ProfileCollection extends BaseCollection {
  constructor(public db: Database) {
    super(db, {
      api: '/profile',
      firebase: '/profile'
    })
  }
}

export class Profile {
  legalName: string
  preferredName: string
  phoneNumber: string
  birthday: string
  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // public $key: string;

  // @IsEnum(ProjectType)
  // projectType: ProjectType;

  // @IsDefined()
  // @IsNotEmpty()
  // title: string;

  // @IsDefined()
  // @IsNotEmpty()
  // description: string;

  // @IsDefined()
  // @IsDateString()
  // startDateTime: string;

  // @IsDateString()
  // endDateTime?: string;

  // @IsDefined()
  // @ValidateNested()
  // location: Location;

  // @ValidateNested()
  // images: ImageRef[];

  // @IsNumber()
  // ticketPrice?: number;

  // @IsDefined()
  // @IsInt()
  // maxKarmaPoints: number;

  // @IsDefined()
  // @ValidateNested()
  // organizer: Organizer;

  // @IsUrl()
  // projectPageUrl?: string;

  // @IsInt()
  // shareKarmaPoints?: number;
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const profileTransform = (input: object) =>
  transformAndValidate<Profile>(Profile, input, validateOpt)
    .catch(logErrors)

export const profilesTransform = (input: object[]) =>
  transformAndValidate<Profile>(Profile, input, validateOpt)
    .catch(logErrors)
