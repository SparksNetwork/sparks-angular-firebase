import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergemap'
import 'rxjs/add/operator/first'

import { OppQueryService } from './opp-query.service'
import { Opp, OppTransform } from '../../../../../../shared/domain/opp'

@Injectable()
export class ResolveOppByOppKey implements Resolve<any> {

  constructor(
    public query: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Opp>> {
    const oppKey = route.paramMap.get('oppKey')
    const opp = this.query.one(oppKey)
      .mergeMap(OppTransform)

    return opp
      .map(() => opp)
      .first()
  }
}