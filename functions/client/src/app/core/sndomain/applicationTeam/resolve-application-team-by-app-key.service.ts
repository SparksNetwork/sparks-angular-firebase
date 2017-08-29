import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";


import { list } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationTeamQueryService } from "./application-team-query.service";
import { ApplicationTeam, applicationTeamsTransform } from "../../../../../../universal/domain/applicationTeam";
import { SorryService } from "../../sorry/index";

@Injectable()
export class ResolveApplicationTeamByAppKey implements Resolve<any> {

  constructor(
    public query: ApplicationTeamQueryService,
    private sorry: SorryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ApplicationTeam[] | void>> {
    const appKey = route.paramMap.get('applicationKey')
    const appTeams = list(this.query.byAppKey(appKey))
    .switchMap(this.sorry.intercept(applicationTeamsTransform));

    return appTeams
      .map(() => appTeams)
      .first()
  }
}
