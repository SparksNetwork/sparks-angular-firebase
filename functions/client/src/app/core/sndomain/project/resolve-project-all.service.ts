import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/first'
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { SorryService } from '../../sorry'
import { ProjectQueryService } from './project-query.service'
import { Project, projectsTransform } from '../../../../../../universal/domain/project'

import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveProjectAll implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public projectQuery: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Project[] | void>> {
    const projects = list(this.projectQuery.all())
      .switchMap(this.sorry.intercept(projectsTransform))

    return connectedResolver(projects)
  }
}
