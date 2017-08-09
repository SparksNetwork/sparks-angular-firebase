import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { TeamQueryService } from '../../../core/sndomain/team/team-query.service'

@Injectable()
export class ResolveTeamByFirstOpp implements Resolve<any> {

  constructor(
    public contribQuery: TeamQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const opps = route.parent.data['opps']
    const firstOpp = opps.map(opps => opps[0])
    const teams = firstOpp
      .mergeMap(opp => this.contribQuery.af.list('/team', {
        query: {
          orderByChild: 'oppKey',
          equalTo: opp.$key,
        }
      }))
      .do(teams => console.log('teams found', teams))

    return teams
      .map(() => teams)
      .first()
  }
}