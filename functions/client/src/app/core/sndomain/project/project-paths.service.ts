import { Injectable } from '@angular/core';

import { ProjectPaths } from '../../../../../../shared/domain/project'
// TODO: api should have a root that comes from environment
@Injectable()
export class ProjectPathsService extends ProjectPaths {}