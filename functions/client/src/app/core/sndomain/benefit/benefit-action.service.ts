import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { environment } from '../../../../environments/environment'

import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { BenefitQueryService } from './benefit-query.service'

@Injectable()
export class BenefitActionService extends BaseActionService {

  constructor(
    public query: BenefitQueryService,
    public http: Http,
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

}
