import { Injectable, Inject } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import {
  BaseQueryService,
  BasePaths,
  BaseCollection,
} from '../../../../../../lib/firebase-universal/client'

import { ProjectPathsService } from './project-paths.service'

import { ProjectCollection } from '../../../../../../universal/domain/project'

@Injectable()
export class ProjectQueryService extends BaseQueryService<ProjectCollection> {
  public static collectionClass = ProjectCollection

  constructor(
    @Inject(ProjectPathsService) public paths: BasePaths,
    public af: AngularFireDatabase,
  ) {
    super(paths, af)
  }

}