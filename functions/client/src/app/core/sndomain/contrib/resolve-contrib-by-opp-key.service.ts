import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { ContribQueryService } from './contrib-query.service'

import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveContribByOppKey implements Resolve<any> {

  constructor(
    public contribQuery: ContribQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const oppKey = route.paramMap.get('oppKey')
    const contribs = list(this.contribQuery.collection.byOppKey(oppKey))
    // const contribs = this.contribQuery.af.list('/contrib', {
    //   query: {
    //     orderByChild: 'oppKey',
    //     equalTo: oppKey,
    //   },
    // })

    return contribs
      .map(() => contribs)
      .first()
  }
}