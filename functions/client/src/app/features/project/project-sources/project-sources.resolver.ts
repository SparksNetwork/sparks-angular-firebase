import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/delay'

import { ProjectQueryService } from '../../../core/sndomain/project'

@Injectable()
export class ProjectSources implements Resolve<any> {

  constructor(
    public projectQuery: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const project = this.projectQuery.one(route.paramMap.get('key'))
    const sources = { project }
    return project
      .map(() => sources)
      .delay(3000)
      .first()
  }
}