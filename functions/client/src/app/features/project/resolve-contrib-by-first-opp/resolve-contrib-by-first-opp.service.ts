import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { ContribQueryService } from '../../../core/sndomain/contrib/contrib-query.service'
import { Contrib, contribsTransform } from "../../../../../../universal/domain/contrib";
import { Observable } from "rxjs/Observable";
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveContribByFirstOpp implements Resolve<any> {

  constructor(
    public query: ContribQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Contrib[]>> {
    const opps$ = route.parent.data['opps']
    const contribs$ = opps$
      .map(opps => opps[0])
      .switchMap(opp => list(this.query.byOppKey(opp.$key)))
      .switchMap(contribsTransform)

    return connectedResolver(contribs$)
  }
}
