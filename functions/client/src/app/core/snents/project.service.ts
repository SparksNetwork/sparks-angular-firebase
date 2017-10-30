import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Project } from './project.model'

import { ProjectFetch } from './actions'

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
        .select('ents').select('project').select(key)
        .map(p => p || {loading: false, loaded: false, values: {}})
        .shareReplay(1)

      this.items[key].subscribe(project => {
        if (!project || (!project.loaded && !project.loading)) {
          this.store.dispatch(new ProjectFetch(key))
        }
      })
    }
    return this.items[key]
  }

}
