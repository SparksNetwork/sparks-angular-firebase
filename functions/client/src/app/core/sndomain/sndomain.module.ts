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

import {
  ResolveTeamByOppKey, 
  TeamQueryService,
  TeamActionService,
  TeamPathsService
} from "./team";


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
 
    TeamQueryService,
    TeamActionService,
    ResolveTeamByOppKey,
    TeamPathsService
  ],
})
export class SNDomainModule { }
