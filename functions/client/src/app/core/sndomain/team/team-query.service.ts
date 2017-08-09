import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseQueryService,
  BasePaths,
  BaseCollection,
} from '../../../../../../lib/firebase-universal/client'



import { OppCollection } from '../../../../../../universal/domain/opp'
import { TeamPathsService } from "./team-paths.service";

@Injectable()
export class TeamQueryService extends BaseQueryService<OppCollection> {
  public static collectionClass = OppCollection

  constructor(
    @Inject(TeamPathsService) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}