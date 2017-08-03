import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { OppQueryService } from './opp-query.service'

@Injectable()
export class ResolveOppByProjectKey implements Resolve<any> {

  constructor(
    public oppQuery: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('projectKey')
    const opps = this.oppQuery.af.list('/opp', {
      query: {
        orderByChild: 'projectKey',
        equalTo: projectKey,
      },
    })

    return opps
      .map(() => opps)
      .first()
  }
}