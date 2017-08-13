import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { ContribQueryService } from '../../../core/sndomain/contrib/contrib-query.service'
import { Contrib, contribsTransform } from "../../../../../../universal/domain/contrib";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ResolveContribByFirstOpp implements Resolve<any> {

  constructor(
    public contribQuery: ContribQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Observable<Contrib[]>> {
    const opps = route.parent.data['opps']
    const firstOpp = opps.map(opps => opps[0])
    const contribs = firstOpp
      .mergeMap(opp => this.contribQuery.af.list('/contrib', {
        query: {
          orderByChild: 'oppKey',
          equalTo: opp.$key,
        }
      }))
      .mergeMap(contribsTransform)

    return contribs
      .map(() => contribs)
      .first()
  }
}