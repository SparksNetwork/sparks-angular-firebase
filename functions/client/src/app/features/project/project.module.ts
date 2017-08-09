import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SNUIModule } from '../../shared/snui/snui.module'
import { ProjectRoutingModule, routedComponents } from './project-routing.module'
import { MomentModule } from 'angular2-moment'

import { PageProjectHomeAllOppsGuard } from './page-project-home-all-opps-guard/page-project-home-all-opps-guard.service'
import { ResolveFirstOpp } from './resolve-first-opp/resolve-first-opp.service'
import { ResolveContribByFirstOpp } from './resolve-contrib-by-first-opp/resolve-contrib-by-first-opp.service'
import { ResolveBenefitByFirstOpp } from "./resolve-benefit-by-first-opp/resolve-benefit-by-first-opp.service";
import { ResolveTeamByFirstOpp } from "./resolve-team-by-first-opp/resolve-team-by-first-opp.service";

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    SNUIModule,
    ProjectRoutingModule,
  ],
  providers: [
    PageProjectHomeAllOppsGuard,
    ResolveFirstOpp,
    ResolveContribByFirstOpp,
    ResolveBenefitByFirstOpp,
    ResolveTeamByFirstOpp,
  ],
})
export class ProjectModule { }

