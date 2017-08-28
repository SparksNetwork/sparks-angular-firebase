import { transformAndValidate } from 'class-transformer-validator'
import { Expose } from 'class-transformer'
import { IsISO8601, IsMobilePhone } from "class-validator";

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
  legalName: string
  preferredName: string

  @IsMobilePhone('en-US')
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
