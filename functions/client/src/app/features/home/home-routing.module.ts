import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ResolveProjectAll } from "../../core/sndomain/project/resolve-project-all.service";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      projects: ResolveProjectAll
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [HomeComponent];