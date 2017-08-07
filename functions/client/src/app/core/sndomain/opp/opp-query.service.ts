import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseQueryService,
  BasePaths,
  BaseCollection,
} from '../../../../../../lib/firebase-universal/client'

import { OppPathsService } from './opp-paths.service'

import { OppCollection } from '../../../../../../universal/domain/opp'

@Injectable()
export class OppQueryService extends BaseQueryService<OppCollection> {
  public static collectionClass = OppCollection

  constructor(
    @Inject(OppPathsService) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}