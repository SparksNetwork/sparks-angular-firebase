import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ResolveProjectAll } from "../../core/sndomain/project/resolve-project-all.service";
import { HomeAllProjectsComponent } from "./home-all-projects/home-all-projects.component";
import { ResolveApplicationByProfileKey } from "../../core/sndomain/application/resolve-applications-by-profile-key.service";
import { ResolveProfile } from '../../core/sndomain/profile/resolve-profile.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      profile: ResolveProfile,
      projects: ResolveProjectAll,
      applications: ResolveApplicationByProfileKey
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [HomeComponent, HomeAllProjectsComponent];