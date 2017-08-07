import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseQueryService,
  BasePaths,
  BaseCollection,
} from '../../../../../../lib/firebase-universal/client'

import { BenefitPathsService } from './benefit-paths.service'

import { BenefitCollection } from '../../../../../../universal/domain/benefit'

@Injectable()
export class BenefitQueryService extends BaseQueryService<BenefitCollection> {
  public static collectionClass = BenefitCollection

  constructor(
    @Inject(BenefitPathsService) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}