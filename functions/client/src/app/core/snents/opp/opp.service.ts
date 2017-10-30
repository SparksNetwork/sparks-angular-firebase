import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Opp } from './opp.model'

import { OppActions } from './opp.actions'

export interface Idx {
  loading: boolean,
  loaded: boolean,
  keys: string[]
}

const DEFAULT_IDX: Idx = {
  loading: false,
  loaded: false,
  keys: []
}

@Injectable()
export class ProjectService {
  public items: {[key: string]: Observable<any>} = {}
  public idx: {[field: string]: {
    [value: string]: Observable<Idx>
  }}
  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {}

  public by(field: string, value: string) {
    if (!this.idx[field]) { this.idx[field] = {} }
    if (!this.idx[field][value]) {
      this.idx[field][value] = this.store
        .select('ents').select('opps').select('idx')
        .map(idx => (idx[field] && idx[field][value]) || DEFAULT_IDX)
        .shareReplay(1)

      this.idx[field][value].subscribe(idx => {
        if (!idx || (!idx.loaded && !idx.loading)) {
          this.store.dispatch(new OppActions.FetchBy(field, value))
        }
      })
    }

  }

  public one(key: string) {
    if (!this.items[key]) {
      this.items[key] = this.store
        .select('ents').select('projects').select(key)
        .map(p => p || {loading: false, loaded: false, values: {}})
        .shareReplay(1)

      this.items[key].subscribe(item => {
        if (!item || (!item.loaded && !item.loading)) {
          this.store.dispatch(new OppActions.Fetch(key))
        }
      })
    }
    return this.items[key]
  }

}
