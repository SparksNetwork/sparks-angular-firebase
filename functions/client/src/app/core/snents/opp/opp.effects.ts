import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'

import { OppActions } from './opp.actions'

@Injectable()
export class OppEffects {
  constructor(
    public actions$: Actions,
    public af: AngularFireDatabase,
  ) {}

  @Effect()
  fetch: Observable<Action> =
    this.actions$.ofType<OppActions.Fetch>(OppActions.FETCH)
      .switchMap(({payload}) => this.af.object(`/opp/${payload}`).snapshotChanges())
      .map(snap => new OppActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))

  @Effect()
  fetchBy: Observable<Action> =
    this.actions$.ofType<OppActions.FetchBy>(OppActions.FETCH_BY)
      .switchMap(action =>
        this.af.list('/opp', ref => ref.orderByChild(action.payload.field).equalTo(action.payload.value)).snapshotChanges()
          .switchMap(snap => {
            const idxSuccess = new OppActions.FetchBySuccess({
              field: action.payload.field,
              value: action.payload.value,
              keys: snap.map(s => s.key),
            })
            const itemSuccesses = snap.map(s =>
              new OppActions.FetchSuccess({
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
}
