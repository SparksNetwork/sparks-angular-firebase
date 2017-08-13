import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { BaseActionService } from '../../../../../../lib/firebase-universal/client'

import { ProjectQueryService } from './project-query.service'

@Injectable()
export class ProjectActionService extends BaseActionService {

  constructor(
    public query: ProjectQueryService,
    public http: Http,
  ) {
    super(query.paths, http)
  }

}