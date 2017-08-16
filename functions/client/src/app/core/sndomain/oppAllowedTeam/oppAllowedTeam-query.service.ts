import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { OppAllowedTeamCollection } from '../../../../../../universal/domain/oppAllowedTeam'

@Injectable()
export class OppAllowedTeamQueryService extends OppAllowedTeamCollection {
  constructor(
    public af: AngularFireDatabase,
  ) {
    super(af.database)
  }
}
