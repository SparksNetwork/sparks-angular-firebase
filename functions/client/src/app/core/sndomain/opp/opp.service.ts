import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Store, Action } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { AngularFireDatabase } from 'angularfire2/database'
import 'rxjs/add/observable/from'

import { UserService } from '../../user/user.service'

import { Opp, OppItem } from './opp.model'
import { OppActions } from './opp.actions'

import { RestClient } from '../base/rest-client'
import { EntStore } from '../base/ent-store'

@Injectable()
export class OppService {
  public client: RestClient
  public ents: EntStore<Opp>

  constructor(
    public store: Store<any>,
    public actions$: Actions,
    public http: Http,
    public db: AngularFireDatabase,
    public userService: UserService,
  ) {
    this.client = new RestClient(http, 'opp', userService.current$)
    this.ents = new EntStore<Opp>('opp', store,
      OppActions.Fetch,
      OppActions.FetchSuccess,
      OppActions.FetchBy,
      OppActions.FetchBySuccess
    )
  }

  @Effect() onCreate: Observable<Action> =
    this.actions$.ofType<OppActions.Create>(OppActions.CREATE)
      .switchMap(action => this.client.create(action.payload))
      .map(response => new OppActions.CreateSuccess(response.json()))

  @Effect() onFetch: Observable<Action> =
    this.actions$.ofType<OppActions.Fetch>(OppActions.FETCH)
      .switchMap(({payload}) => this.db.object(`/opp/${payload}`).snapshotChanges())
      .map(snap => new OppActions.FetchSuccess({key: snap.key, values: snap.payload.val()}))

  @Effect() onFetchBy: Observable<Action> =
    this.actions$.ofType<OppActions.FetchBy>(OppActions.FETCH_BY)
      .switchMap(({payload}) =>
        this.db.list(`/opp`,
          ref => ref.orderByChild(payload.field).equalTo(payload.value)
        ).snapshotChanges()
        // .delay(3000)
        .switchMap(snap => {
          const idxSuccess = new OppActions.FetchBySuccess({
            field: payload.field,
            value: payload.value,
            keys: snap.map(s => s.key)
          })
          const itemSuccesses = snap.map(s =>
            new OppActions.FetchSuccess({
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

  public create(p: Opp) {
    this.store.dispatch(new OppActions.Create(p))
  }

}

