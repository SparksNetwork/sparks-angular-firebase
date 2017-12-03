import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Store, Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { AngularFireDatabase } from 'angularfire2/database'
import 'rxjs/add/observable/from'

import { UserService } from '../../user/user.service'

import { Team, TeamItem } from './team.model'
import { TeamActions } from './team.actions'

import { RestClient } from '../base/rest-client'
import { EntStore } from '../base/ent-store'

@Injectable()
export class TeamService {
  public client: RestClient
  public ents: EntStore<Team>

  constructor(
    public store: Store<any>,
    public actions$: Actions,
    public http: Http,
    public db: AngularFireDatabase,
    public userService: UserService,
  ) {
    this.client = new RestClient(http, 'team', userService.current$)
    this.ents = new EntStore<Team>('team', store,
      TeamActions.Fetch,
      TeamActions.FetchSuccess,
      TeamActions.FetchBy,
      TeamActions.FetchBySuccess
    )
  }

  @Effect() onCreate: Observable<Action> =
    this.actions$.ofType<TeamActions.Create>(TeamActions.CREATE)
      .switchMap(action => this.client.create(action.payload))
      .map(response => new TeamActions.CreateSuccess(response.json()))

  @Effect() onFetch: Observable<Action> =
    this.actions$.ofType<TeamActions.Fetch>(TeamActions.FETCH)
      .switchMap(({payload}) => this.db.object(`/team/${payload}`).snapshotChanges())
      .map(snap => new TeamActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))

  @Effect() onFetchBy: Observable<Action> =
    this.actions$.ofType<TeamActions.FetchBy>(TeamActions.FETCH_BY)
      .switchMap(({payload}) =>
        this.db.list(`/team`,
          ref => ref.orderByChild(payload.field).equalTo(payload.value)
        ).snapshotChanges()
        // .delay(3000)
        .switchMap(snap => {
          const idxSuccess = new TeamActions.FetchBySuccess({
            field: payload.field,
            value: payload.value,
            keys: snap.map(s => s.key)
          })
          const itemSuccesses = snap.map(s =>
            new TeamActions.FetchSuccess({
              key: s.key,
              values: s.payload.val()
            })
          )
          return Observable.from([...itemSuccesses, idxSuccess])
        })
      )

  public one(key: string) {
    return this.ents.one(key)
  }

  public by(field: string, value: string) {
    return this.ents.by(field, value)
  }

  public create(p: Team) {
    this.store.dispatch(new TeamActions.Create(p))
  }

}

