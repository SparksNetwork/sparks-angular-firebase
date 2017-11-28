import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Store, Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { AngularFireDatabase } from 'angularfire2/database'

import { Project, ProjectItem } from './project.model'
import { ProjectActions } from './project.actions'

import { RestClient } from '../base/rest-client'
import { EntStore } from '../base/ent-store'

@Injectable()
export class ProjectService {
  public client: RestClient
  public ents: EntStore<Project>

  constructor(
    public store: Store<any>,
    public actions$: Actions,
    public http: Http,
    public db: AngularFireDatabase,
  ) {
    this.client = new RestClient(http, 'project')
    this.ents = new EntStore<Project>('project', store,
      ProjectActions.Fetch,
      ProjectActions.FetchSuccess,
      ProjectActions.FetchBy,
      ProjectActions.FetchBySuccess
    )
  }

  @Effect() onCreate: Observable<Action> =
    this.actions$.ofType<ProjectActions.Create>(ProjectActions.CREATE)
      .switchMap(action => this.client.create(action.payload))
      .map(response => new ProjectActions.CreateSuccess(response.json()))

  @Effect() onFetch: Observable<Action> =
    this.actions$.ofType<ProjectActions.Fetch>(ProjectActions.FETCH)
      .switchMap(({payload}) => this.db.object(`/project/${payload}`).snapshotChanges())
      .map(snap => new ProjectActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))

  public one(key: string): Observable<ProjectItem> {
    return this.ents.one(key)
  }

  public create(p: Project) {
    this.store.dispatch(new ProjectActions.Create(p))
  }

}

