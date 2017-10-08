import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import 'rxjs/add/operator/first'

import { ProfileQueryService } from "./profile-query.service";
import { profileTransform, Profile } from "../../../../../../universal/domain/profile";
import { Observable } from "rxjs/Observable";
import { SorryService } from "../../sorry/sorry.service";
import { ProfileActionService } from './profile-action.service'
import { AuthService } from '../../snauth/auth/auth.service'

import { obj } from "../../../../../../lib/firebase-angular-observables/obj";

@Injectable()
export class ResolveProfile implements Resolve<any> {
    constructor(
        public sorry: SorryService,
        public query: ProfileQueryService,
        public action: ProfileActionService,
        public auth: AuthService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Profile | void>> {
        const profile$ =
            Observable.combineLatest(
                this.auth.current,
                this.auth.current.switchMap(user => user ? user.getToken() : Observable.of(null))
            )
            .switchMap(([user, token]) => {
                if (user && user.uid) {
                    return this.action.create({token})
                        .switchMap(() => obj(this.query.one(user.uid)).switchMap(this.sorry.intercept(profileTransform)))
                } else {
                    return Observable.of(null)
                }
            })

        return connectedResolver(profile$)
    }
}
