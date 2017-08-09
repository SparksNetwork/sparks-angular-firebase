import { transformAndValidate } from "class-transformer-validator"
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsEnum, ValidationError, IsDateString, ValidateNested, IsNumber, IsInt, IsUrl, IsDefined } from 'class-validator'

import {
  BasePaths,
  BaseCollection,
} from '../../lib/firebase-universal/shared'

// uncomfortable about including these as we haven't started developing any features with them yet
import { Location } from './location'
import { ImageRef } from './imageRef'
import { Organizer } from './organizer'
import { logErrors } from "../logger/logger";

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
  @IsDefined()
  @IsNotEmpty()
  public $key: string;

  @IsEnum(ProjectType)
  projectType: ProjectType;

  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsDateString()
  startDateTime: string;

  @IsDateString()
  endDateTime?: string;

  @IsDefined()
  @ValidateNested()
  location: Location;

  @ValidateNested()
  images: ImageRef[];

  @IsNumber()
  ticketPrice?: number;

  @IsDefined()
  @IsInt()
  maxKarmaPoints: number;

  @IsDefined()
  @ValidateNested()
  organizer: Organizer;

  @IsUrl()
  projectPageUrl?: string;

  @IsInt()
  shareKarmaPoints?: number;

  // test validation works
  // @IsNotEmpty()
  // foo: string
}

// any methods here will be available on both client and server
export class ProjectCollection extends BaseCollection { }

const validateOpt = { validator: { skipMissingProperties: true } };

// we have two transform functions for type safety, not sure why overloading isnt working see below
export const projectTransform = (input: object) =>
  transformAndValidate<Project>(Project, input, validateOpt)
    .catch(logErrors)

export const projectsTransform = (input: object[]) =>
  transformAndValidate<Project>(Project, input, validateOpt)
    .catch(logErrors)