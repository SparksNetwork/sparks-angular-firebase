import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/catch'

import { SorryService } from '../../sorry'
import { ProjectQueryService } from './project-query.service'
import { Project, projectTransform } from '../../../../../../universal/domain/project'

import { obj } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveProjectByProjectKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Project | void>> {
    const projectKey = route.paramMap.get('projectKey')
    const projects = obj(this.query.one(projectKey))
      .switchMap(this.sorry.intercept(projectTransform))
      // .switchMap(projectTransform)
      // .catch(this.sorry.activate.bind(this.sorry))

    return projects
      .map(() => projects)
      .first()
  }

}
