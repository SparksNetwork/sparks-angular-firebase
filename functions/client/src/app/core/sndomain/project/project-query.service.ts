import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

import { ProjectCollection } from '../../../../../../universal/domain/project'

@Injectable()
export class ProjectQueryService extends ProjectCollection {
  constructor(
    public af: AngularFireDatabase,
  ) {
    super(af.database)
  }
}
