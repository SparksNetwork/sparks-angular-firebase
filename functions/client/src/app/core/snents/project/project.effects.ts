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
    this.actions$.ofType<ProjectActions.Fetch>(ProjectActions.PROJECT_FETCH)
      .switchMap(({payload}) => this.af.object(`/project/${payload}`).snapshotChanges())
      .map(snap => new ProjectActions.FetchSuccess(snap.key, snap.payload.val()))
      // .delay(3000)
}
