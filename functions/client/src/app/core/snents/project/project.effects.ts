import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { Router } from '@angular/router'

import { ProjectActions } from './project.actions'
import { ProjectActionService } from '../../sndomain/project/project-action.service'

@Injectable()
export class ProjectEffects {
  constructor(
    public actions$: Actions,
    public af: AngularFireDatabase,
    public restClient: ProjectActionService,
    public router: Router,
  ) {}

  @Effect()
  fetchProject: Observable<Action> =
    this.actions$.ofType<ProjectActions.Fetch>(ProjectActions.FETCH)
      .switchMap(({payload}) => this.af.object(`/project/${payload}`).snapshotChanges())
      // .delay(30000)
      .map(snap => new ProjectActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))

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

    @Effect()
    create: Observable<Action> =
      this.actions$.ofType<ProjectActions.Create>(ProjectActions.CREATE)
        .do(a => console.log('CREATE effect triggered', a))
        .switchMap(action =>
          this.restClient.create(action.payload)
        )
        .map(response =>
          new ProjectActions.CreateSuccess(response.json())
        )
        .do(a => console.log('new CREATE_SUCCESS action', a))

    @Effect({dispatch: false})
    createSuccess: Observable<Action> =
      this.actions$.ofType<ProjectActions.CreateSuccess>(ProjectActions.CREATE_SUCCESS)
        .do(action => this.router.navigate(['/organize', action.payload]))
}
