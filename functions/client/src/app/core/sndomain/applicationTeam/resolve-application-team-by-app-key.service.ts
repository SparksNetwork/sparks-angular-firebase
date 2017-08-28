import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";


import { list } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationTeamQueryService } from "./application-team-query.service";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";

@Injectable()
export class ResolveApplicationTeamByAppKey implements Resolve<any> {

  constructor(
    public query: ApplicationTeamQueryService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ApplicationTeam[]>> {
    //const appKey = route.paramMap.get('appKey')
    const appKey = 'AP1'
    const appTeams = list(this.query.byAppKey(appKey))

    return appTeams
      .map(() => appTeams)
      .first()
  }
}
