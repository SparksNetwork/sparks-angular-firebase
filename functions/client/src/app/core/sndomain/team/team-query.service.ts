import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { TeamCollection } from '../../../../../../universal/domain/team';

@Injectable()
export class TeamQueryService extends TeamCollection {
  constructor(
    public af: AngularFireDatabase,
  ) {
    super(af.database)
  }
}
