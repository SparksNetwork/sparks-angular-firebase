import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { Team, teamsTransform } from "../../../../../../universal/domain/team";
import { OppAllowedTeamQueryService } from "../oppAllowedTeam/oppAllowedTeam-query.service";

// import { OppAllowedTeamQueryService }
import { list } from '../../../../../../lib/firebase-angular-observables'

@Injectable()
export class ResolveTeamByOppKey implements Resolve<any> {

  constructor(
    public query: OppAllowedTeamQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Team[]>> {
    const oppKey = route.paramMap.get('oppKey')
    const teams = list(this.query.collection.by('oppKey', oppKey))
      .map(oppAllowedTeams => oppAllowedTeams.map(oAT => ({$key: oAT.teamKey, ...oAT.team})))
      .mergeMap(teamsTransform)

    return teams
      .map(() => teams)
      .first()
  }
}