import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseQueryService,
  BasePaths,
  BaseCollection,
} from '../../../../../../lib/firebase-universal/client'

import { ContribPathsService } from './contrib-paths.service'

import { ContribCollection } from '../../../../../../universal/domain/contrib'

@Injectable()
export class ContribQueryService extends BaseQueryService<ContribCollection> {
  public static collectionClass = ContribCollection

  constructor(
    @Inject(ContribPathsService) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}