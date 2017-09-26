import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

import { Observable } from "rxjs/Observable";
import { connectedResolver } from '../../../../../../lib/angular-connected-resolver'

import { list } from '../../../../../../lib/firebase-angular-observables'
import { ApplicationTeamQueryService } from "./application-team-query.service";
import { ApplicationTeam, applicationTeamsTransform } from "../../../../../../universal/domain/applicationTeam";
import { SorryService } from "../../sorry/index";

@Injectable()
export class ResolveApplicationTeamByApplication implements Resolve<any> {

  constructor(
    public query: ApplicationTeamQueryService,
    private sorry: SorryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ApplicationTeam[] | void>> {
    const app$ = route.parent.data['application']
    const appTeams$ = app$
      .switchMap(app => list(this.query.byAppKey(app.$key)))
      .switchMap(this.sorry.intercept(applicationTeamsTransform))

    return connectedResolver(appTeams$)
  }
}
