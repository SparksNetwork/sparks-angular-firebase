import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http'

import {
  BaseActionService,
  BasePaths,
} from '../../../../../../lib/firebase-universal/client'
import { TeamPathsService } from "./team-paths.service";


const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/team'

@Injectable()
export class TeamActionService extends BaseActionService {

  constructor(
    @Inject(TeamPathsService) paths: BasePaths,
    public http: Http,
  ) {
    super(paths, http)
  }

}