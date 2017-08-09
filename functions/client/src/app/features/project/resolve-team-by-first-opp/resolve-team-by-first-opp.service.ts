import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'

import { Team, teamsTransform } from "../../../../../../universal/domain/team";
import { TeamQueryService } from '../../../core/sndomain/team/team-query.service'

@Injectable()
export class ResolveTeamByFirstOpp implements Resolve<any> {

  constructor(
    public contribQuery: TeamQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Team[]>> {
    const opps = route.parent.data['opps']
    const firstOpp = opps.map(opps => opps[0])
    const teams = firstOpp
      .mergeMap(opp => this.contribQuery.af.list('/oppAllowedTeam', {
        query: {
          orderByChild: 'oppKey',
          equalTo: opp.$key,
        }
      }))
      .map(oppAllowedTeams => oppAllowedTeams.map(oAT => ({$key: oAT.teamKey, ...oAT.team})))
      .mergeMap(teamsTransform)
      .do(teams => console.log('teams found', teams))

    return teams
      .map(() => teams)
      .first()
  }
}
