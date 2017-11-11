
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Team } from './team.model'

import { TeamActions } from './team.actions'
import { BaseEntService } from '../ngrx-ents'

@Injectable()
export class TeamService extends BaseEntService<Team> {
  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {
    super(
      af,
      store,
      'team',
      TeamActions.Fetch,
      TeamActions.FetchBy
    )
  }
}
