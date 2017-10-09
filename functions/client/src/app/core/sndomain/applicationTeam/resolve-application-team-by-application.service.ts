import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database'
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
    public afdb: AngularFireDatabase,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ApplicationTeam[] | void>> {
    const app$ = route.parent.data['application']
    const appTeams$ = app$
      .do(app => console.log('app', app))
      .switchMap(app => list(this.query.byAppKey(app.$key)))
    // .switchMap(app => this.afdb.list(this.query.ref, () => this.query.by('appKey', app.$key)).snapshotChanges())
      // .do(actions => console.log('actions', actions))
      // .map(actions => actions.map(action => ({$key: action.payload.key, ...action.payload.val()})))
      .do(appTeams => console.log('appTeams', appTeams))

    // const teams = this.afdb.list(this.query.ref, () => this.query.by('oppKey', oppKey)).snapshotChanges()

    // .switchMap(app => list(this.query.byAppKey(app.$key)))
      .switchMap(this.sorry.intercept(applicationTeamsTransform))

    return connectedResolver(appTeams$)
  }
}
