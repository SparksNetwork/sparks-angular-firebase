import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { OppQueryService } from './opp-query.service'

@Injectable()
export class ResolveOppByOppKey implements Resolve<any> {

  constructor(
    public query: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const oppKey = route.paramMap.get('oppKey')
    const opp = this.query.one(oppKey)
      .map(opp => {opp.discountDescription = 'bar'; return opp})

    return opp
      .map(() => opp)
      .first()
  }
}