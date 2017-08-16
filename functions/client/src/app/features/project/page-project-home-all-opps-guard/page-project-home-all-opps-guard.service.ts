import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import {
  OppQueryService,
} from '../../../core/sndomain/opp/opp-query.service'

import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class PageProjectHomeAllOppsGuard implements CanActivate {
  constructor(
    public router: Router,
    public oppQuery: OppQueryService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('projectKey')
    return list(this.oppQuery.byProjectKey(projectKey))
      .do(opps => {
        if (opps && (opps.length === 1)) {
          this.router.navigate(['/project', projectKey, 'join'])
        }
      })
      .map(() => true)
      .first()
  }
}
