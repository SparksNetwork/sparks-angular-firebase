import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ResolveProjectAll } from "../../core/sndomain/project/resolve-project-all.service";
import { HomeAllProjectsComponent } from "./home-all-projects/home-all-projects.component";



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      projects: ResolveProjectAll
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [HomeComponent, HomeAllProjectsComponent];