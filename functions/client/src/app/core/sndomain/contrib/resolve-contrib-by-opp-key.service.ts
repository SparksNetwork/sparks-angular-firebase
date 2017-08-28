import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { ContribQueryService } from './contrib-query.service'

import { list } from '../../../../../../lib/firebase-angular-observables'
import { SorryService } from "../../sorry/index";
import { contribsTransform, Contrib } from "../../../../../../universal/domain/contrib";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ResolveContribByOppKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: ContribQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Contrib[] | void>> {
    const oppKey = route.paramMap.get('oppKey')
    const contribs = list(this.query.byOppKey(oppKey))
      .mergeMap(this.sorry.intercept(contribsTransform))

    return contribs
      .map(() => contribs)
      .first()
  }
}
