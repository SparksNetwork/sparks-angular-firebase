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
    const opps = this.oppQuery.af.list('/opp', {
      query: {
        orderByChild: 'projectKey',
        equalTo: projectKey,
      },
    })
      .do(opps => console.log('source', opps))
      .mergeMap(OppTransform)
      .do(opps => console.log('transormed', opps))

    return opps
      .map(() => opps)
      .first()
  }
}