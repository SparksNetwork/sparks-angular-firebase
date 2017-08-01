import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http'

import {
  BaseActionService,
  BasePaths,
} from '../../../../../../lib/firebase-universal/client'

import { ProjectPathsService } from './project-paths.service'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'

@Injectable()
export class ProjectActionService extends BaseActionService {

  constructor(
    @Inject(ProjectPathsService) paths: BasePaths,
    public http: Http,
  ) {
    super(paths, http)
  }

}