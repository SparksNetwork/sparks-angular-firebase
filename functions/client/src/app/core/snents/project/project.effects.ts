import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'

import { ProjectActions } from './project.actions'

@Injectable()
export class ProjectEffects {
  constructor(
    public actions$: Actions,
    public af: AngularFireDatabase,
  ) {}

  @Effect()
  fetchProject: Observable<Action> =
    this.actions$.ofType<ProjectActions.Fetch>(ProjectActions.FETCH)
      .switchMap(({payload}) => this.af.object(`/project/${payload}`).snapshotChanges())
      .map(snap => new ProjectActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))
      // .delay(3000)

  @Effect()
  fetchBy: Observable<Action> =
    this.actions$.ofType<ProjectActions.FetchBy>(ProjectActions.FETCH_BY)
      .switchMap(action =>
        this.af.list('/project').snapshotChanges()
          .switchMap(snap => {
            const idxSuccess = new ProjectActions.FetchBySuccess({
              field: action.payload.field,
              value: action.payload.value,
              keys: snap.map(s => s.key),
            })
            const itemSuccesses = snap.map(s =>
              new ProjectActions.FetchSuccess({
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
