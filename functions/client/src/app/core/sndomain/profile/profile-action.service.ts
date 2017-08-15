import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { environment } from '../../../../environments/environment'

import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { ProfileQueryService } from './profile-query.service'

@Injectable()
export class ProfileActionService extends BaseActionService {

  constructor(
    public query: ProfileQueryService,
    public http: Http,
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

}
