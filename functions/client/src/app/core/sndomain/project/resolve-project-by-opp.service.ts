import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

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
        // const oppKey = route.paramMap.get('oppKey')
        // const opp$ = obj(this.opps.one(oppKey))
        const opp$ = route.parent.data['opp']
        const project$ = opp$
            .switchMap(opp => obj(this.query.one(opp.projectKey)))
            .switchMap(this.sorry.intercept(projectTransform))

        return project$
            .first()
            .map(() => project$)
        // if (route.parent.data) {
        //  return route.parent.data['opp'].map(
        //         opp => {
        //             if (opp && opp.projectKey) {
        //                 const project = obj(this.query.one(opp.projectKey))
        //                     .switchMap(this.sorry.intercept(projectTransform))
        //                 return project
        //             }
        //         }
        //     ).first()
        // } else {
        //     return Observable.of(null);
        // }
    }

}
