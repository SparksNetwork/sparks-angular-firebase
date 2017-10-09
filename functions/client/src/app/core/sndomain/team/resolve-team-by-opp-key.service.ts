import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { AngularFireDatabase } from 'angularfire2/database'
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
    public afdb: AngularFireDatabase,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Team[] | void>> {
    const oppKey = route.paramMap.get('oppKey')
    const teams$ = this.afdb.list(this.query.ref, () => this.query.by('oppKey', oppKey)).snapshotChanges()
    // const teams = this.afdb.object(this.query.by('oppKey', oppKey)).snapshotChanges()
    // const teams = this.afdb.object(this.query.one('BABP1-1')).snapshotChanges()
    // .map(action => [{$key: action.payload.val().teamKey, ...action.payload.val().team}])
    // const teams = this.afdb.list(this.query.by('oppKey', oppKey)).snapshotChanges()
      .map(actions => actions.map(action => ({$key: action.payload.val().teamKey, ...action.payload.val().team})))
      .do(teams => console.log('teams', teams))
      // .map(actions => actions.map(action => ({$key: action.payload.key, ...action.payload.val()})))
      // .do(actions => console.log('actions', actions))
    // const teams = list(this.query.by('oppKey', oppKey))
      // .map(oppAllowedTeams => oppAllowedTeams.map(oAT => ({$key: oAT.teamKey, ...oAT.team})))
      .switchMap(this.sorry.intercept(teamsTransform))

    return connectedResolver(teams$)
  }
}
