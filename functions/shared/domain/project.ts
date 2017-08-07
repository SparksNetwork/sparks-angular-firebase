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
    projectKey: string;
    projectType: ProjectType;
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
}

// any methods here will be available on both client and server
export class ProjectCollection extends BaseCollection {}
