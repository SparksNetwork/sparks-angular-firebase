import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { OppQueryService } from '../../../core/sndomain/opp'
import { ContribQueryService } from '../../../core/sndomain/contrib'

@Injectable()
export class ProjectListSources implements Resolve<any> {

  constructor(
    public oppQuery: OppQueryService,
    public contribQuery: ContribQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const key = route.paramMap.get('key')
    const opp = this.oppQuery.one(key)
    const contribs = this.contribQuery.af.list(this.contribQuery.collection.ref, {
      query: {
        orderByChild: 'oppKey',
        equalTo: key,
      }
    })

    // const opp = this.oppQuery.af(this.oppQuery.collection.one(''))
    const sources = {
      opp,
      contribs,
    }
    return opp
      .map(() => sources)
      .first()
  }
}