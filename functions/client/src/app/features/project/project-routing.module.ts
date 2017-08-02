import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectListPageComponent } from './project-list-page/project-list-page.component'
import { ProjectPageComponent } from './project-page/project-page.component'
import { ProjectPageOppsComponent } from './project-page-opps/project-page-opps.component'
import { ProjectPageSingleOppComponent } from './project-page-single-opp/project-page-single-opp.component'
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component'
import { ProjectListSources } from './project-list-sources/project-list-sources.resolver'
import { ProjectSources } from './project-sources/project-sources.resolver'
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProjectDateComponent } from './project-date/project-date.component';
import { ProjectLocationComponent } from "./project-location/project-location.component";
import { ProjectDescriptionComponent } from "./project-description/project-description.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectListPageComponent,
    resolve: {
      sources: ProjectListSources,
    }
  },
  {
    path: ':key',
    resolve: {
      sources: ProjectSources,
    },
    children: [
      {
        path: '',
        component: ProjectPageComponent,
      },
      {
        path: 'edit',
        component: ProjectEditPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }

export const routedComponents = [
  ProjectListPageComponent,
  ProjectEditPageComponent,
  ProjectPageComponent,
  ProjectPageOppsComponent,
  ProjectPageSingleOppComponent,
  ProjectTitleComponent,
  ProjectDateComponent,
  ProjectLocationComponent,
  ProjectDescriptionComponent
];