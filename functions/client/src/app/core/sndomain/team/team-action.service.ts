import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { environment } from '../../../../environments/environment';
import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { TeamQueryService } from './team-query.service'

@Injectable()
export class TeamActionService extends BaseActionService {

  constructor(
    public query: TeamQueryService,
    public http: Http,
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

}
