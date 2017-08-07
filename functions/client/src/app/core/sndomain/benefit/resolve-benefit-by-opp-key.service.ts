import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { BenefitQueryService } from './benefit-query.service'

@Injectable()
export class ResolveBenefitByOppKey implements Resolve<any> {

  constructor(
    public benefitQuery: BenefitQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const oppKey = route.paramMap.get('oppKey')
    const benefits = this.benefitQuery.af.list('/benefit', {
      query: {
        orderByChild: 'oppKey',
        equalTo: oppKey,
      },
    })

    return benefits
      .map(() => benefits)
      .first()
  }
}