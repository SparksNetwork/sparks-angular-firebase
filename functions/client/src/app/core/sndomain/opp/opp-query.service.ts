import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { OppCollection } from '../../../../../../universal/domain/opp'

@Injectable()
export class OppQueryService extends OppCollection {
  constructor(
    public af: AngularFireDatabase,
  ) {
    super(af.database)
  }
}
