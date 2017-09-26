import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

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

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Application[] | void>> {
        const applications$ = this.auth.current
            .switchMap(user => user ? list(this.query.byProfileKey(user.uid)) : Observable.of([]))
            .switchMap(this.sorry.intercept(applicationsTransform))

        return connectedResolver(applications$)
    }
}
