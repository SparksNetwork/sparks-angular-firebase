import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseCollectionService,
  BasePaths,
} from '../../../../../../lib/firebase-universal/client'

import { ProjectPaths } from './project-paths.service'

@Injectable()
export class ProjectCollectionService extends BaseCollectionService {

  constructor(
    @Inject(ProjectPaths) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}