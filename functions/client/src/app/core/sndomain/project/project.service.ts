import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Store, Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { AngularFireDatabase } from 'angularfire2/database'

import { UserService } from '../../user/user.service'

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
    public userService: UserService,
  ) {
    this.client = new RestClient(http, 'project', userService.current$)
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

      @Effect() onFetchBy: Observable<Action> =
      this.actions$.ofType<ProjectActions.FetchBy>(ProjectActions.FETCH_BY)
        .switchMap(({payload}) =>
          this.db.list(`/project`,
            ref => ref.orderByChild(payload.field).equalTo(payload.value)
          ).snapshotChanges()
          // .delay(3000)
          .switchMap(snap => {
            const idxSuccess = new ProjectActions.FetchBySuccess({
              field: payload.field,
              value: payload.value,
              keys: snap.map(s => s.key)
            })
            const itemSuccesses = snap.map(s =>
              new ProjectActions.FetchSuccess({
                key: s.key,
                values: s.payload.val()
              })
            )
            return Observable.from([...itemSuccesses, idxSuccess])
          })
        )

  public one(key: string): Observable<ProjectItem> {
    return this.ents.one(key)
  }

  public by(field: string, value: string) {
    return this.ents.by(field, value)
  }

  public create(p: Project) {
    this.store.dispatch(new ProjectActions.Create(p))
  }

}

