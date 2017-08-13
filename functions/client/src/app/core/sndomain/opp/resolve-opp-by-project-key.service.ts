import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { OppQueryService } from './opp-query.service'
import { Opp, oppsTransform } from '../../../../../../universal/domain/opp'

import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveOppByProjectKey implements Resolve<any> {

  constructor(
    public query: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Opp[] | void>> {
    const projectKey = route.paramMap.get('projectKey')
    // this fails
    // const opps = this.oppQuery.af.list(this.oppQuery.collection.byProjectKey(projectKey))
    // see https://github.com/angular/angularfire2/issues/1094
    // this works
    const opps = list(this.query.collection.byProjectKey(projectKey))
    // const opps = this.oppQuery.af.list('/opp', {
    //   query: {
    //     orderByChild: 'projectKey',
    //     equalTo: projectKey,
    //   },
    // })
      .mergeMap(oppsTransform)

    return opps
      .map(() => opps)
      .first()
  }
}