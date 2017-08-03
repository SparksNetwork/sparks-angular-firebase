import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SNUIModule } from '../../shared/snui/snui.module'
import { ProjectRoutingModule, routedComponents } from './project-routing.module'

import { PageProjectHomeAllOppsGuard } from './page-project-home-all-opps-guard/page-project-home-all-opps-guard.service'
import { ResolveContribByFirstOpp } from './resolve-contrib-by-first-opp/resolve-contrib-by-first-opp.service'

@NgModule({
  declarations: routedComponents,
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SNUIModule,
    ProjectRoutingModule,
  ],
  providers: [
    PageProjectHomeAllOppsGuard,
    ResolveContribByFirstOpp,
  ],
})
export class ProjectModule { }

