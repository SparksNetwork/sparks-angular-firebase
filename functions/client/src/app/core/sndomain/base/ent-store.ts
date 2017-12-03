import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { ItemState, IdxState } from './types'
import 'rxjs/add/operator/shareReplay'

export const DEFAULT_IDX: IdxState = {
  loading: false,
  loaded: false,
  keys: []
}

export class EntStore<TModel> {
  public items = {}
  public idx = {}

  constructor(
    public ent: string,
    public store: Store<any>,
    public FetchAction,
    public FetchSuccessAction,
    public FetchByAction,
    public FetchBySuccessAction,
  ) {}

  public by(field: string, value: string): Observable<IdxState> {
    console.log('by', field, value)
    if (!this.idx[field]) { this.idx[field] = {} }
    if (!this.idx[field][value]) {
      this.idx[field][value] = this.store
        .select('sndomain').select(this.ent).select('idx')
        .map(idx => (idx[field] && idx[field][value]) || DEFAULT_IDX)
        .shareReplay(1)

      this.idx[field][value].subscribe(idx => {
        if (!idx || (!idx.loaded && !idx.loading)) {
          this.store.dispatch(new this.FetchByAction({field, value}))
        }
      })
    }

    return this.idx[field][value]
  }

  public one(key: string): Observable<ItemState<TModel>> {
    if (!this.items[key]) {
      this.items[key] = this.store
        .select('sndomain').select(this.ent).select('items').select(key)
        .map(p => p || {loading: false, loaded: false, values: {}})
        .shareReplay(1)

      this.items[key].subscribe(item => {
        if (!(item.loading || item.loaded)) {
          this.store.dispatch(new this.FetchAction(key))
        }
      })
    }
    return this.items[key]
  }

}
