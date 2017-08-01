import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectListPageComponent } from './project-list-page/project-list-page.component'
import { ProjectPageComponent } from './project-page/project-page.component'
import { ProjectListSources } from './project-list-sources/project-list-sources.resolver'
import { ProjectSources } from './project-sources/project-sources.resolver'

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
    component: ProjectPageComponent,
    resolve: {
      sources: ProjectSources,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }

export const routedComponents = [
  ProjectListPageComponent,
  ProjectPageComponent,
];