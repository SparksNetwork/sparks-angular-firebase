import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { environment } from '../../../../environments/environment'

import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { ContribQueryService } from './contrib-query.service'

@Injectable()
export class ContribActionService extends BaseActionService {

  constructor(
    public query: ContribQueryService,
    public http: Http,
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

}
