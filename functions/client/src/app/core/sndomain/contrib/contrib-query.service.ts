import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { ContribCollection } from '../../../../../../universal/domain/contrib'

@Injectable()
export class ContribQueryService extends ContribCollection {
  constructor(
    public af: AngularFireDatabase,
  ) {
    super(af.database)
  }
}
