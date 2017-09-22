import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { obj } from '../../../../../../lib/firebase-angular-observables'

import { SorryService } from '../../../core/sorry/sorry.service';
import { ApplicationQueryService } from '../../../core/sndomain/application/application-query.service';
import { Application, applicationTransform } from '../../../../../../universal/domain/application';
import { AuthService, User } from '../../../core/snauth/auth/auth.service';
import { Opp } from '../../../../../../universal/domain/opp';

@Injectable()
export class ResolveApplicationByOpp implements Resolve<any> {

    constructor(
        public sorry: SorryService,
        public query: ApplicationQueryService,
        private auth: AuthService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<void | Application>> {
        const application = Observable.combineLatest(this.auth.current, route.parent.data['opp'])
            .mergeMap(([user, opp]: [User, Opp]) => {
                const projectProfileKey = this.query.generateProjectProfileKey(opp.projectKey, user.uid);
                return obj(this.query.one(projectProfileKey));
            })
            .switchMap(this.sorry.intercept(applicationTransform));

        return application
            .map(() => application)
            .first();
    }
}
