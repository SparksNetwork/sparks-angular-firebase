import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { BenefitCollection } from '../../../../../../universal/domain/benefit'

@Injectable()
export class BenefitQueryService extends BenefitCollection {
  constructor(
    public af: AngularFireDatabase,
  ) {
    super(af.database)
  }
}
