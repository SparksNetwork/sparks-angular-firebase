import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { obj } from '../../../../../../lib/firebase-angular-observables'

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

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<{}> | Observable<Application | void>> {

        if (route.parent.data) {
            const oppObs = route.parent.data['opp'];
            const profileObs = route.parent.data['profile'];

            const application = Observable.combineLatest(oppObs, profileObs)
                .mergeMap(([opp, profile]: [Opp, Profile]) => {
                    const projectProfileKey = this.query.generateProjectProfileKey(opp.projectKey, profile.$key);

                    return obj(this.query.one(projectProfileKey))
                        .take(1)
                        .mergeMap((app: Application) => {
                            if (app && app.projectKey) {
                                return Observable.of(app);
                            }

                            // application doesn't exist, create it now
                            return this.action.createApplication(opp.projectKey, profile.$key, opp.$key)
                                .delay(500)
                                .mergeMap(res => {
                                    if (res.ok) {
                                        console.log('createApplication success!')
                                        return obj(this.query.one(projectProfileKey)).take(1);
                                    } else {
                                        console.log('createApplication failed')
                                        return Observable.of(null);
                                    }
                                })
                        })
                        .mergeMap(this.sorry.intercept(applicationTransform));
                });

            return application
                .map(() => application)
                .first()
        } else {
            return Observable.of(null);
        }
    }
}
