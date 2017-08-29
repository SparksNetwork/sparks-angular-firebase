import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";

import { list } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationQueryService } from "./application-query.service";
import { Application, applicationsTransform } from "../../../../../../universal/domain/application";
import { AuthService } from "../../snauth/auth/auth.service";
import { SorryService } from "../../sorry/sorry.service";

@Injectable()
export class ResolveApplicationByProfileKey implements Resolve<any> {

    constructor(
        public query: ApplicationQueryService,
        private auth: AuthService,
        private sorry: SorryService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<{}> | Observable<Application[] | void>> {

        var applications = this.auth.current.map(user => {
            if (!user) return Observable.of(null);

            return list(this.query.byProfileKey(user.uid))
                .switchMap(this.sorry.intercept(applicationsTransform));
        })

        return applications.first();
    }
}
