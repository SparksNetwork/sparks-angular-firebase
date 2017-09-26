import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ApplicationQueryService } from '../application/application-query.service';
import 'rxjs/add/operator/first'
import { obj } from '../../../../../../lib/firebase-angular-observables/obj';
import { Application, ApplicationStatus } from '../../../../../../universal/domain/application';
import { AuthService, User } from '../../snauth/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Opp, oppTransform } from '../../../../../../universal/domain/opp';
import { OppQueryService } from '../opp/opp-query.service';
import { SorryService } from '../../sorry/sorry.service';

@Injectable()
export class RequireApplicationAcceptedService implements CanActivate {

    constructor(
        public router: Router,
        private auth: AuthService,
        public applicationQuery: ApplicationQueryService,
        public oppQuery: OppQueryService,
        public sorry: SorryService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const oppKey = route.paramMap.get('oppKey');

        return Observable.combineLatest(
            this.auth.current,
            obj(this.oppQuery.one(oppKey)).switchMap(this.sorry.intercept(oppTransform)))
            .switchMap(([user, opp]: [User, Opp]) => {
                const projectProfileKey = this.applicationQuery.compoundKey(opp.projectKey, user.uid);
                return obj(this.applicationQuery.one(projectProfileKey)).map((application: Application) => {

                    if (!application || application.status !== ApplicationStatus.Accepted) {
                        this.router.navigateByUrl(`/apply/${oppKey}/application-pending`)
                        return false;
                    }
                    return true;
                })
            }).first();
    }
}
