import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'



import { TeamQueryService } from "./team-query.service";
import { Team, teamTransform } from "../../../../../../universal/domain/team";

@Injectable()
export class ResolveTeamByTeamKey implements Resolve<any> {

  constructor(
    public query: TeamQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Team>> {
    const teamKey = route.paramMap.get('teamKey')
    const team = this.query.af.object(this.query.collection.one(teamKey))
      .mergeMap(teamTransform)

    return team
      .map(() => team)
      .first()
  }
}