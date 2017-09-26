import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { SorryService } from '../../sorry'
import { ProjectQueryService } from './project-query.service'
import { OppQueryService } from '../opp/opp-query.service'
import { Project, projectTransform } from '../../../../../../universal/domain/project'

import { obj } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveProjectByOpp implements Resolve<any> {

    constructor(
        public sorry: SorryService,
        public query: ProjectQueryService,
        public opps: OppQueryService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Project | void>> {
        const opp$ = route.parent.data['opp']
        const project$ = opp$
            .switchMap(opp => obj(this.query.one(opp.projectKey)))
            .switchMap(this.sorry.intercept(projectTransform))

        return connectedResolver(project$)
    }

}
