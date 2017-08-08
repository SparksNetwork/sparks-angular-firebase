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

import {
  BenefitQueryService,
  BenefitActionService,
  BenefitPathsService,
  ResolveBenefitByOppKey,
} from './benefit'

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
<<<<<<< HEAD
 
    TeamQueryService,
    TeamActionService,
    ResolveTeamByOppKey,
    TeamPathsService
=======

    BenefitQueryService,
    BenefitActionService,
    BenefitPathsService,
    ResolveBenefitByOppKey,
>>>>>>> 820250f... Display benefits loaded from the DB
  ],
})
export class SNDomainModule { }
