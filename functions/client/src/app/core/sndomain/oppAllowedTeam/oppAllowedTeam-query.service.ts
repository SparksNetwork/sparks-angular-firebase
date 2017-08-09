import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseQueryService,
  BasePaths,
  BaseCollection,
} from '../../../../../../lib/firebase-universal/client'

import { OppAllowedTeamPathsService } from './oppAllowedTeam-paths.service'

import { OppAllowedTeamCollection } from '../../../../../../universal/domain/oppAllowedTeam'

@Injectable()
export class OppAllowedTeamQueryService extends BaseQueryService<OppAllowedTeamCollection> {
  public static collectionClass = OppAllowedTeamCollection

  constructor(
    @Inject(OppAllowedTeamPathsService) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}