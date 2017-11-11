import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { Router } from '@angular/router'

import { TeamActions } from './team.actions'
import { TeamActionService } from '../../sndomain/team/team-action.service'

@Injectable()
export class TeamEffects {
  constructor(
    public actions$: Actions,
    public af: AngularFireDatabase,
    public restClient: TeamActionService,
    public router: Router,
  ) {}

  @Effect()
  fetch: Observable<Action> =
    this.actions$.ofType<TeamActions.Fetch>(TeamActions.FETCH)
      .switchMap(({payload}) => this.af.object(`/team/${payload}`).snapshotChanges())
      // .delay(30000)
      .map(snap => new TeamActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))

  @Effect()
  fetchBy: Observable<Action> =
    this.actions$.ofType<TeamActions.FetchBy>(TeamActions.FETCH_BY)
      .switchMap(action =>
        this.af.list('/team', ref => ref.orderByChild(action.payload.field).equalTo(action.payload.value)).snapshotChanges()
          .do(snap => console.log('team fetch by snap changes', snap))
          .switchMap(snap => {
            const idxSuccess = new TeamActions.FetchBySuccess({
              field: action.payload.field,
              value: action.payload.value,
              keys: snap.map(s => s.key),
            })
            const itemSuccesses = snap.map(s =>
              new TeamActions.FetchSuccess({
                key: s.key,
                values: s.payload.val()
              })
            )
            return Observable.from([
              ...itemSuccesses,
              idxSuccess,
            ])
          })
      )

    @Effect()
    create: Observable<Action> =
      this.actions$.ofType<TeamActions.Create>(TeamActions.CREATE)
        .do(a => console.log('CREATE effect triggered', a))
        .switchMap(action =>
          this.restClient.create(action.payload)
        )
        .map(response =>
          new TeamActions.CreateSuccess(response.json())
        )
        .do(a => console.log('new CREATE_SUCCESS action', a))

    @Effect({dispatch: false})
    createSuccess: Observable<Action> =
      this.actions$.ofType<TeamActions.CreateSuccess>(TeamActions.CREATE_SUCCESS)
        .do(action => this.router.navigate(['/organize', action.payload]))
}
