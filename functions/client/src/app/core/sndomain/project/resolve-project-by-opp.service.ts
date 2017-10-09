import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database'

import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { SorryService } from '../../sorry'
import { ProjectQueryService } from './project-query.service'
import { OppQueryService } from '../opp/opp-query.service'
import { Project, projectTransform } from '../../../../../../universal/domain/project'

@Injectable()
export class ResolveProjectByOpp implements Resolve<any> {

    constructor(
        public sorry: SorryService,
        public query: ProjectQueryService,
        public opps: OppQueryService,
        public afdb: AngularFireDatabase,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<{}>> {
        const opp$ = route.parent.data['opp']
        const project$ = opp$
            .switchMap(opp => this.afdb.object(this.query.one(opp.projectKey)).snapshotChanges())
            .map(action => ({$key: action.payload.key, ...action.payload.val()}))
            .switchMap(this.sorry.intercept(projectTransform))

        return connectedResolver(project$)
    }

}
