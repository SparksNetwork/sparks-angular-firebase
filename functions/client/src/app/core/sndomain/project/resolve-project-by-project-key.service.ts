import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { ProjectQueryService } from './project-query.service'
import { Project, projectTransform } from '../../../../../../shared/domain/project'

@Injectable()
export class ResolveProjectByProjectKey implements Resolve<any> {

  constructor(
    public query: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Project | void>> {
    const projectKey = route.paramMap.get('projectKey')
    const project = this.query.af.object(this.query.collection.one(projectKey))
      .mergeMap(projectTransform)

    return project
      .map(() => project)
      .first()
  }
}