import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'
import { IsNotEmpty, ValidationError } from 'class-validator'

import {
  BasePaths,
  BaseCollection,
} from '../../lib/firebase-universal/shared'

// uncomfortable about including these as we haven't started developing any features with them yet
import { Location } from './location'
import { ImageRef } from './imageRef'
import { Organizer } from './organizer'

export class ProjectPaths extends BasePaths {
  firebase = '/project'
  api = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'
  // firebase = '/Projects'
  // api = 'https://sparksnetwork-6de8b.firebaseio.com/Projects'
}

export enum ProjectType { 
  Simple, 
  MultiDay, 
  LongTerm, 
  Donor 
}

export class Project {
  @Expose()
  public $key: string

  projectKey: string;
  projectType: ProjectType;

  @IsNotEmpty()
  title: string;

  description: string;
  startDateTime: string;
  endDateTime?: string;
  location: Location;
  images: ImageRef[];
  ticketPrice?: number;
  maxKarmaPoints: number;
  organizer: Organizer;
  projectPageUrl?: string;
  shareKarmaPoints?: number;

  // test validation works
  // @IsNotEmpty()
  // foo: string
}

// any methods here will be available on both client and server
export class ProjectCollection extends BaseCollection {}

// move this elsewhere when we need to use it in another domain object
function logErrors(errs: ValidationError[]) {
  console.log('Validation Errors:')
  errs.forEach(err => {
    console.log('property', err.property)
    Object.keys(err.constraints).forEach(cKey => console.log(err.constraints[cKey]))
  })
}

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const projectTransform = (input: object) =>
  transformAndValidate<Project>(Project, input)
    .catch(logErrors)

export const projectsTransform = (input: object[]) =>
  transformAndValidate<Project>(Project, input)
    .catch(logErrors)