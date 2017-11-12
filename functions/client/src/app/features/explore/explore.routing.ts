import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ExploreHomePageComponent } from './components/explore-home-page.component'

// import { HomeComponent } from './home.component';
// import { ResolveProjectAll } from '../../core/sndomain/project/resolve-project-all.service'
// import { HomeAllProjectsComponent } from './home-all-projects/home-all-projects.component'
// import { ResolveApplicationByProfileKey } from '../../core/sndomain/application/resolve-applications-by-profile-key.service'
// import { ResolveProfile } from '../../core/sndomain/profile/resolve-profile.service'

const routes: Routes = [
  {
    path: '',
    component: ExploreHomePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule { }

export const routedComponents = [
  ExploreHomePageComponent,
]
