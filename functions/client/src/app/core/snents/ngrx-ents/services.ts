import { Observable } from 'rxjs/Observable'
import { IdxState, DEFAULT_IDX, ItemState } from './types'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'

export class BaseEntService<TModel> {
  public items: {[key: string]: Observable<ItemState<TModel>>} = {}
  public idx: {[field: string]: {
    [value: string]: Observable<IdxState>
  }} = {}

  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>,
    public entPath: string,
    public FetchClass,
    public FetchByClass,
  ) {}

  public by(field: string, value: string) {
    // if (!field || !value) {
    //   console.log('by called with null field or value', field, value)
    //   return Observable.of()
    // }
    if (!this.idx[field]) { this.idx[field] = {} }
    if (!this.idx[field][value]) {
      this.idx[field][value] = this.store
        .select('ents').select(this.entPath).select('idx')
        .map(idx => (idx[field] && idx[field][value]) || DEFAULT_IDX)
        .shareReplay(1)

      this.idx[field][value].subscribe(idx => {
        if (!idx || (!idx.loaded && !idx.loading)) {
          this.store.dispatch(new this.FetchByClass({field, value}))
        }
      })
    }
    return this.idx[field][value]
  }

  public one(key: string) {
    // if (!key) {
    //   console.log('one called with undefined key')
    //   return Observable.of()
    // }
    if (!this.items[key]) {
      this.items[key] = this.store
        .select('ents').select(this.entPath).select('items').select(key)
        .map(p => p || {loading: false, loaded: false, values: {}})
        .shareReplay(1)

      this.items[key].subscribe(item => {
        if (!item || (!item.loaded && !item.loading)) {
          this.store.dispatch(new this.FetchClass(key))
        }
      })
    }
    return this.items[key]
  }
}
