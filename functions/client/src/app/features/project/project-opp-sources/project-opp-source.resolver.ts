import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { OppQueryService } from '../../../core/sndomain/opp'

@Injectable()
export class ProjectListSources implements Resolve<any> {

  constructor(
    public oppQuery: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const key = route.paramMap.get('key')
    const opp = this.oppQuery.one(key)
    // const opp = this.oppQuery.af(this.oppQuery.collection.one(''))
    const sources = { opp }
    return opp
      .map(() => sources)
      .first()
  }
}