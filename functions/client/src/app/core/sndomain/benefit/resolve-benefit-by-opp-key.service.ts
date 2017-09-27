import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { BenefitQueryService } from './benefit-query.service'
import { Observable } from "rxjs/Observable";
import { Benefit, benefitsTransform } from "../../../../../../universal/domain/benefit";

import { list } from '../../../../../../lib/firebase-angular-observables'
import { SorryService } from "../../sorry/index";

@Injectable()
export class ResolveBenefitByOppKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: BenefitQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Benefit[] | void>> {
    const oppKey = route.paramMap.get('oppKey')
    const benefits = list(this.query.byOppKey(oppKey))
      .switchMap(this.sorry.intercept(benefitsTransform))

    return connectedResolver(benefits)
  }
}
