import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {
  ProjectQueryService,
  ProjectActionService,
  ResolveProjectAll,
  ResolveProjectByProjectKey,
  ResolveProjectByOpp
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

import {
  ApplicationQueryService,
  ApplicationActionService,
  ResolveApplicationByKey,
  ResolveApplicationByProfileKey,
  ResolveApplicationByProjectKey,
  ResolveApplication
} from './application'

import {
  ResolveApplicationTeamByAppKey,
  ApplicationTeamQueryService,
  ApplicationTeamActionService
} from './applicationTeam'

import {
  ShiftQueryService,
  ShiftActionService,
} from './shift'

import {
  ApplicationShiftQueryService,
  ApplicationShiftActionService,
  ResolveApplicationShiftByAppKey
} from './applicationShift'


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
    ResolveProjectByOpp,

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

    ApplicationQueryService,
    ApplicationActionService,
    ResolveApplicationByKey,
    ResolveApplicationByProfileKey,
    ResolveApplicationByProjectKey,
    ApplicationTeamQueryService,
    ApplicationTeamActionService,
    ResolveApplicationTeamByAppKey,
    ResolveApplication,

    ShiftQueryService,
    ShiftActionService,

    ApplicationShiftQueryService,
    ApplicationShiftActionService,
    ResolveApplicationShiftByAppKey,
  ],
})
export class SNDomainModule { }
