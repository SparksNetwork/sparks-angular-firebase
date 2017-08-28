import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {
  ProjectQueryService,
  ProjectActionService,
  ResolveProjectAll,
  ResolveProjectByProjectKey,
} from './project'

import {
  ProfileQueryService,
  ProfileActionService,
  RequireProfileCompleteService,
  ResolveProfile,
} from './profile'

import {
  OppQueryService,
  OppActionService,
  ResolveOppByProjectKey,
  ResolveOppByOppKey,
} from './opp'

import {
  ContribQueryService,
  ContribActionService,
  ResolveContribByOppKey,
} from './contrib'

import {
  ResolveTeamByOppKey,
  // TeamQueryService,
  // TeamActionService,
} from './team'

import {
  OppAllowedTeamQueryService,
} from './oppAllowedTeam'

import {
  BenefitQueryService,
  BenefitActionService,
  ResolveBenefitByOppKey,
} from './benefit'

import{
  ResolveApplicationTeamByAppKey, 
  ApplicationTeamQueryService,
  ApplicationTeamActionService
} from './applicationTeam'

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ProjectQueryService,
    ProjectActionService,
    ResolveProjectAll,
    ResolveProjectByProjectKey,

    ProfileQueryService,
    ProfileActionService,
    RequireProfileCompleteService,
    ResolveProfile,

    OppQueryService,
    OppActionService,
    ResolveOppByProjectKey,
    ResolveOppByOppKey,

    ContribQueryService,
    ContribActionService,
    ResolveContribByOppKey,

    // TeamQueryService,
    // TeamActionService,
    ResolveTeamByOppKey,

    OppAllowedTeamQueryService,

    BenefitQueryService,
    BenefitActionService,
    ResolveBenefitByOppKey,

    ApplicationTeamQueryService,
    ApplicationTeamActionService,
    ResolveApplicationTeamByAppKey
  ],
})
export class SNDomainModule { }
