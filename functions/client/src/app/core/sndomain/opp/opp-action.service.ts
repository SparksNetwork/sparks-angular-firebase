import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http'

import {
  BaseActionService,
  BasePaths,
} from '../../../../../../lib/firebase-universal/client'

import { OppPathsService } from './opp-paths.service'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'

@Injectable()
export class OppActionService extends BaseActionService {

  constructor(
    @Inject(OppPathsService) paths: BasePaths,
    public http: Http,
  ) {
    super(paths, http)
  }

}