import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'
import { IsISO8601, Matches, IsDefined, IsNotEmpty } from "class-validator";

import {
  BaseCollection,
  Database,
} from '../../lib/firebase-universal/shared'

// uncomfortable about including these as we haven't started developing any features with them yet
// import { Location } from './location'
// import { ImageRef } from './imageRef'
// import { Organizer } from './organizer'


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
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  public $key: string

  legalName: string
  preferredName: string

  @Matches(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)
  phoneNumber: string

  @IsISO8601()
  birthday: string
}

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const profileTransform = (input: object) =>
  transformAndValidate<Profile>(Profile, input, validateOpt)

export const profilesTransform = (input: object[]) =>
  transformAndValidate<Profile>(Profile, input, validateOpt)
