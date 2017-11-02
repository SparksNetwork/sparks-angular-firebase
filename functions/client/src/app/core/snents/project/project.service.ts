import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Project } from './project.model'

import { ProjectActions } from './project.actions'
import { BaseEntService } from '../ngrx-ents'

@Injectable()
export class ProjectService extends BaseEntService<Project> {
  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {
    super(
      af,
      store,
      'project',
      ProjectActions.Fetch,
      ProjectActions.FetchBy
    )
  }
}
