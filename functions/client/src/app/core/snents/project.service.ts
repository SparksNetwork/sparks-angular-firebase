import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
// import { Project } from '../../store/project/project.model'

import { ProjectFetch } from './actions'

// import { IState } from '../../store/interface'

@Injectable()
export class ProjectService {

  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {}

  public one(key: string) {
    return this.store.select('ents').select('project')
      .map(projects => projects[key])
      .do(project => {
        console.log('service/project', project)
        if (!project || (!project.loaded && !project.loading)) {
          console.log('service/dispatch fetch')
          this.store.dispatch(new ProjectFetch(key))
        }
      })
  }

}

    // return this.store.select('project')
    //   .map(projects => projects[key])
    //   .do(project => {
    //     if (project.loaded) {
    //       this.store.dispatch(new ProjectFetch(key))
    //     }
    //   })
