import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { AuthService } from '../auth/auth.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/first'

@Injectable()
export class RequireNoEmailVerification implements CanActivate {

    constructor(
        public auth: AuthService,
        public router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.current.map(user => {
            if (!user || (user && user.emailVerified)) {
                this.router.navigate(['/']);
                // return false;
            }
            return true;
        }).first()
    }
}
