import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { environment } from '../../../../environments/environment'

import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { OppQueryService } from './opp-query.service'

@Injectable()
export class OppActionService extends BaseActionService {

  constructor(
    public query: OppQueryService,
    public http: Http,
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

}
