import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectListPageComponent } from './project-list-page/project-list-page.component'
import { ProjectPageComponent } from './project-page/project-page.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectListPageComponent
  },
  {
    path: ':key',
    component: ProjectPageComponent,
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