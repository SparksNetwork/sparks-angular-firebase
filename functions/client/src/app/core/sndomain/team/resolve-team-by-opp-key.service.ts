import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { Team, teamsTransform } from "../../../../../../universal/domain/team";
import { TeamQueryService } from "./team-query.service";



@Injectable()
export class ResolveTeamByOppKey implements Resolve<any> {

  constructor(
    public teamQuery: TeamQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Team[]>> {
    const oppKey = route.paramMap.get('oppKey')
    const teams = this.teamQuery.af.list('/teams', {
      query: {
        orderByChild: 'oppKey',
        equalTo: oppKey,
      },
    })
      .mergeMap(teamsTransform)

    return teams
      .map(() => teams)
      .first()
  }
}