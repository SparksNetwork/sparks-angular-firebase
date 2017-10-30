import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Project } from './project.model'

import { ProjectActions } from './project.actions'
import { IdxState, IdxCacheState, DEFAULT_IDX } from '../ngrx-ents'

@Injectable()
export class ProjectService {
  public items: {[key: string]: Observable<any>} = {}
  public idx: {[field: string]: {
    [value: string]: Observable<IdxState>
  }} = {}

  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {}

  public by(field: string, value: string) {
    if (!this.idx[field]) { this.idx[field] = {} }
    if (!this.idx[field][value]) {
      this.idx[field][value] = this.store
        .select('ents').select('project').select('idx')
        .map(idx => (idx[field] && idx[field][value]) || DEFAULT_IDX)
        .shareReplay(1)

      this.idx[field][value].subscribe(idx => {
        if (!idx || (!idx.loaded && !idx.loading)) {
          this.store.dispatch(new ProjectActions.FetchBy({field, value}))
        }
      })
    }
    return this.idx[field][value]
  }

  public one(key: string) {
    if (!this.items[key]) {
      this.items[key] = this.store
        .select('ents').select('project').select('items').select(key)
        .map(p => p || {loading: false, loaded: false, values: {}})
        .shareReplay(1)

      this.items[key].subscribe(item => {
        if (!item || (!item.loaded && !item.loading)) {
          this.store.dispatch(new ProjectActions.Fetch(key))
        }
      })
    }
    return this.items[key]
  }

}
