import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { Store } from '@ngrx/store'
import { Opp } from './opp.model'

import { OppActions } from './opp.actions'
import { BaseEntService } from '../ngrx-ents'

@Injectable()
export class OppService extends BaseEntService<Opp> {
  constructor(
    public af: AngularFireDatabase,
    public store: Store<any>
  ) {
    super(
      af,
      store,
      'opp',
      OppActions.Fetch,
      OppActions.FetchBy
    )
  }
}
