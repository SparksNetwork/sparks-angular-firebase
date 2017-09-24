import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from 'rxjs/Observable';

import { list, obj } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationQueryService } from './application-query.service';
import { Application, applicationsTransform, applicationTransform } from '../../../../../../universal/domain/application';
import { AuthService } from '../../snauth/auth/auth.service';
import { SorryService } from '../../sorry/sorry.service';

@Injectable()
export class ResolveApplicationByProjectKey implements Resolve<any> {

    constructor(
        public query: ApplicationQueryService,
        private auth: AuthService,
        private sorry: SorryService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Application | void>> {
        const projectKey = route.paramMap.get('projectKey') || route.parent.paramMap.get('projectKey');

        const applications = this.auth.current.map(user => {
            if (!user) {
                return Observable.of(null);
            }

            const projectProfileKey = this.query.compoundKey(projectKey, user.uid);
            return obj(this.query.one(projectProfileKey))
                .mergeMap(app => {
                    if (!app || !app.projectKey) {
                        return Observable.of(null);
                    }
                    return Observable.of(app).switchMap(this.sorry.intercept(applicationTransform));
                })
        })

        return applications.first();
    }
}
