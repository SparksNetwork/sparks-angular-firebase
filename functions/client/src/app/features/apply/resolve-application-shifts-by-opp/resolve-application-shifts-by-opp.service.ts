import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { list } from '../../../../../../lib/firebase-angular-observables'

import { SorryService } from '../../../core/sorry/sorry.service';
import { AuthService, User } from '../../../core/snauth/auth/auth.service';
import { Opp } from '../../../../../../universal/domain/opp';
import { ApplicationShiftQueryService } from '../../../core/sndomain/applicationShift/application-shift-query.service';
import { ApplicationShift, applicationShiftsTransform } from '../../../../../../universal/domain/applicationShift';

@Injectable()
export class ResolveApplicationShiftsByOpp implements Resolve<any> {

    constructor(
        public sorry: SorryService,
        public query: ApplicationShiftQueryService,
        private auth: AuthService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ApplicationShift[] | void>> {
        const applicationShifts = Observable.combineLatest(this.auth.current, route.parent.data['opp'])
            .mergeMap(([user, opp]: [User, Opp]) => {
                const projectProfileKey = this.query.compoundKey(opp.projectKey, user.uid);
                return list(this.query.byAppKey(projectProfileKey));
            })
            .switchMap(this.sorry.intercept(applicationShiftsTransform));

        return connectedResolver(applicationShifts)
    }
}
