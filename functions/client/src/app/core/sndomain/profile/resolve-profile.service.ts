import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import 'rxjs/add/operator/first'

import { ProfileQueryService } from "./profile-query.service";
import { profileTransform, Profile } from "../../../../../../universal/domain/profile";
import { Observable } from "rxjs/Observable";
import { SorryService } from "../../sorry/sorry.service";

import { obj } from "../../../../../../lib/firebase-angular-observables/obj";

@Injectable()
export class ResolveProfile implements Resolve<any> {
    constructor(
        public sorry: SorryService,
        public query: ProfileQueryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Profile | void>> {
        const profile = this.query.current
            .mergeMap(this.sorry.intercept(profileTransform));

        return profile        
            .map(() => profile)
            .first()
    }
}