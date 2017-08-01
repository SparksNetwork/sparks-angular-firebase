import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { ProjectQueryService } from '../../../core/sndomain/project'

@Injectable()
export class ProjectListSources implements Resolve<any> {

  constructor(
    public projectQuery: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projects = this.projectQuery.all()
    const sources = { projects }
    return projects
      .map(() => sources)
      .first()
  }
}