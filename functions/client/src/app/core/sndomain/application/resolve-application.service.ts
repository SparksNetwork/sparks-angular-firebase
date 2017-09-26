import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { obj } from '../../../../../../lib/firebase-angular-observables'

import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { ApplicationQueryService } from './application-query.service';
import { SorryService } from '../../sorry/sorry.service';
import { Application, applicationTransform } from '../../../../../../universal/domain/application';
import { Opp } from '../../../../../../universal/domain/opp';
import { Profile } from '../../../../../../universal/domain/profile';
import { ApplicationActionService } from './application-action.service';

@Injectable()
export class ResolveApplication implements Resolve<any> {

    constructor(
        public query: ApplicationQueryService,
        public action: ApplicationActionService,
        private sorry: SorryService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<{}>> {
        const opp$: Observable<any> = route.parent.data['opp']
        const profile$: Observable<any> = route.parent.data['profile']

        const app$ = Observable.combineLatest(opp$, profile$)
            .switchMap(([opp, profile]) => this.action.create({
                oppKey: opp.$key,
                projectKey: opp.projectKey,
                profileKey: profile.$key,
            }))
            .map(response => response.json())
            .switchMap(applicationKey => obj(this.query.one(applicationKey)))

        return connectedResolver(app$)
        }
}
