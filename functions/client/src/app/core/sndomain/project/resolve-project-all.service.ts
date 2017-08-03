import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { ProjectQueryService } from './project-query.service'

@Injectable()
export class ResolveProjectAll implements Resolve<any> {

  constructor(
    public projectQuery: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projects = this.projectQuery.all()

    return projects
      .map(() => projects)
      .first()
  }
}