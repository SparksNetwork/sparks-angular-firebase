import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import {
  OppQueryService,
} from '../../../core/sndomain/opp/opp-query.service'

@Injectable()
export class PageProjectHomeAllOppsGuard implements CanActivate {
  constructor(
    public router: Router,
    public oppQuery: OppQueryService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('projectKey')
    return this.oppQuery.af.list('/opp', {
        query: {
          orderByChild: 'projectKey',
          equalTo: projectKey,
        }
      })
      .do(opps => {
        console.log('guard found opps', opps)
        if (opps && (opps.length == 1)) {
          this.router.navigate(['/project', projectKey, 'join'])
        }
      })
      .map(() => true)
      .first()
  }
}
