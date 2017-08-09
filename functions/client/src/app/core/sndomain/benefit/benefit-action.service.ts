import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http'

import {
  BaseActionService,
  BasePaths,
} from '../../../../../../lib/firebase-universal/client'

import { BenefitPathsService } from './benefit-paths.service'

const APIROOT = 'http://localhost:5002/sparks-development-sd/us-central1/api/project'

@Injectable()
export class BenefitActionService extends BaseActionService {

  constructor(
    @Inject(BenefitPathsService) paths: BasePaths,
    public http: Http,
  ) {
    super(paths, http)
  }

}