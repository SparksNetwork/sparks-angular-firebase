import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Project } from './project.model'

import { ProjectActions } from './project.actions'

@Injectable()
export class ProjectService {
  public items: {[key: string]: Observable<any>} = {}

  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {}

  public one(key: string) {
    if (!this.items[key]) {
      this.items[key] = this.store
        .select('ents').select('projects').select(key)
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
