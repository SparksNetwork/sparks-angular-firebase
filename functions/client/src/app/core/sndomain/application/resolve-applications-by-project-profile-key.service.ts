import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";

import { obj } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationQueryService } from "./application-query.service";
import { Application } from "../../../../../../universal/domain/application";
import { AuthService } from "../../snauth/auth/auth.service";

@Injectable()
export class ResolveApplicationByProjectProfileKey implements Resolve<any> {

    constructor(
        public query: ApplicationQueryService,
        private auth: AuthService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<{}> | Observable<Application[] | void>> {

        var applications = this.auth.current.map(user => {
            if (!user) return Observable.of({});

            return this.query.byProjectProfileKey(route.paramMap.get('projectKey'), user.uid)
        })

        return applications.first();
    }    
}
