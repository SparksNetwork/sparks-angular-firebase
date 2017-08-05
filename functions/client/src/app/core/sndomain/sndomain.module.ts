import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {
  ProjectQueryService,
  ProjectActionService,
  ProjectPathsService,
  ResolveProjectAll,
  ResolveProjectByProjectKey,
} from './project'

import {
  OppQueryService,
  OppActionService,
  OppPathsService,
  ResolveOppByProjectKey,
  ResolveOppByOppKey,
} from './opp'

import {
  ContribQueryService,
  ContribActionService,
  ContribPathsService,
  ResolveContribByOppKey,
} from './contrib'

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ProjectPathsService,
    ProjectQueryService,
    ProjectActionService,
    ResolveProjectAll,
    ResolveProjectByProjectKey,

    OppQueryService,
    OppActionService,
    OppPathsService,
    ResolveOppByProjectKey,
    ResolveOppByOppKey,

    ContribQueryService,
    ContribActionService,
    ContribPathsService,
    ResolveContribByOppKey,
  ],
})
export class SNDomainModule { }
