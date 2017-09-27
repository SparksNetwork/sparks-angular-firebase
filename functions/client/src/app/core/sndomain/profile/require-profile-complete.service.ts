import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

// import { AuthService } from '../../snauth/auth/auth.service'
import { ProfileQueryService } from './profile-query.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/first'

@Injectable()
export class RequireProfileCompleteService implements CanActivate {

    constructor(
        public query: ProfileQueryService,
        public router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.query.current.map(profile => {
        console.log('found profile', profile)
        if (!profile ||
            !profile.legalName ||
            !profile.preferredName ||
            !profile.phoneNumber ||
            !profile.birthday) {
          this.router.navigate(['/apply', route.paramMap.get('oppKey'), 'complete-profile'])
        }
        return true
      })
        .take(1)
    }
}
