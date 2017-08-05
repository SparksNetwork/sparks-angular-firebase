import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergemap'
import 'rxjs/add/operator/first'

import { OppQueryService } from './opp-query.service'
import { Opp, OppTransform } from '../../../../../../shared/domain/opp'

@Injectable()
export class ResolveOppByProjectKey implements Resolve<any> {

  constructor(
    public oppQuery: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('projectKey')
    // this fails
    // const opps = this.oppQuery.af.list(this.oppQuery.collection.byProjectKey(projectKey))
    // this works
    const opps = this.oppQuery.af.list('/opp', {
      query: {
        orderByChild: 'projectKey',
        equalTo: projectKey,
      },
    })
      .mergeMap(OppTransform)

    return opps
      .map(() => opps)
      .first()
  }
}