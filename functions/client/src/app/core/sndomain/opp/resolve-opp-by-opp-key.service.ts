import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { OppQueryService } from './opp-query.service'
import { Opp, oppTransform } from '../../../../../../universal/domain/opp'

import { obj } from '../../../../../../lib/firebase-angular-observables'
import { SorryService } from "../../sorry/index";

@Injectable()
export class ResolveOppByOppKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Opp | void>> {
    const oppKey = route.paramMap.get('oppKey')
    const opp = obj(this.query.one(oppKey))
      .switchMap(this.sorry.intercept(oppTransform))

    return connectedResolver(opp)
  }
}
