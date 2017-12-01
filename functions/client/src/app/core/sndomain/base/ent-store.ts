import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { ItemState } from './types'
import 'rxjs/add/operator/shareReplay'

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
