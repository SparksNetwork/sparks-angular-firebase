import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/first'
import { Team, teamsTransform } from "../../../../../../universal/domain/team";
import { OppAllowedTeamQueryService } from "../oppAllowedTeam/oppAllowedTeam-query.service";
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { list } from '../../../../../../lib/firebase-angular-observables'
import { SorryService } from "../../sorry/index";

@Injectable()
export class ResolveTeamByOppKey implements Resolve<any> {

  constructor(
    public sorry: SorryService,
    public query: OppAllowedTeamQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Team[] | void>> {
    const oppKey = route.paramMap.get('oppKey')
    const teams = list(this.query.by('oppKey', oppKey))
      .map(oppAllowedTeams => oppAllowedTeams.map(oAT => ({$key: oAT.teamKey, ...oAT.team})))
      .switchMap(this.sorry.intercept(teamsTransform))

    return connectedResolver(teams)
  }
}
