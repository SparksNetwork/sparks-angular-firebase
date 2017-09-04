import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ApplicationQueryService } from "../application/application-query.service";

import 'rxjs/add/operator/first'
import { obj } from "../../../../../../lib/firebase-angular-observables/obj";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";

@Injectable()
export class RequireApplicationAcceptedService implements CanActivate {

    constructor(
        public query: ApplicationQueryService,
        public router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const applicationKey = route.parent.paramMap.get("applicationKey");

        return obj(this.query.one(applicationKey)).map((application: Application) => {

            if (!application || application.status != ApplicationStatus.Accepted) {
                this.router.navigateByUrl('/apply/application-pending')
                return false;
            }
            return true
        }).first()
    }
}
