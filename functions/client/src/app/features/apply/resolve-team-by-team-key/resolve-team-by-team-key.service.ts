import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { Team } from "../../../../../../universal/domain/team";

@Injectable()
export class ResolveTeamByTeamKey implements Resolve<any> {

  constructor(
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const teams = route.parent.data['teams'];
    const teamKey = route.paramMap.get("teamKey");
    const team = teams.map(teams => teams.find(s=>s.$key === teamKey));

    return team
      .map(() => team)
      .first()
  }
}