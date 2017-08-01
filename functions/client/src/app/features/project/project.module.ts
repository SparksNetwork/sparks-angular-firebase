import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SNUIModule } from '../../shared/snui/snui.module'
import { ProjectRoutingModule, routedComponents } from './project-routing.module'
import { ProjectListSources } from './project-list-sources/project-list-sources.resolver'
import { ProjectSources } from './project-sources/project-sources.resolver'

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
    ProjectListSources,
    ProjectSources,
  ],
})
export class ProjectModule { }

