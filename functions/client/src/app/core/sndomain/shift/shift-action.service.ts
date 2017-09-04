import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { environment } from '../../../../environments/environment'

import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { ShiftQueryService } from "./shift-query.service"

@Injectable()
export class ShiftActionService extends BaseActionService {

  constructor(
    public query: ShiftQueryService,
    public http: Http,
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

}
