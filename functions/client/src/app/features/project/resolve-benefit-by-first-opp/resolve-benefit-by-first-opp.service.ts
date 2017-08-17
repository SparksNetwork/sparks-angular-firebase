import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { Observable } from "rxjs/Observable";

import { BenefitQueryService } from '../../../core/sndomain/benefit/benefit-query.service'
import { Benefit } from "../../../../../../universal/domain/benefit";

import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveBenefitByFirstOpp implements Resolve<any> {

  constructor(
    public query: BenefitQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Benefit[]>> {
    const opps = route.parent.data['opps']
    const firstOpp = opps.map(opps => opps[0])
    const Benefits = firstOpp
      .mergeMap(opp => list(this.query.byOppKey(opp.$key)))

    return Benefits
      .map(() => Benefits)
      .first()
  }
}