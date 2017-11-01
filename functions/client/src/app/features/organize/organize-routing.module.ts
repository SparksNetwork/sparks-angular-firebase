import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DummyComponent } from './dummy.component'
import { DummyOutletComponent } from './dummy-outlet.component'

import { RoutedHomeComponent } from './routed-home'

// import { HomeComponent } from './home.component';
// import { ResolveProjectAll } from '../../core/sndomain/project/resolve-project-all.service'
// import { HomeAllProjectsComponent } from './home-all-projects/home-all-projects.component'
// import { ResolveApplicationByProfileKey } from '../../core/sndomain/application/resolve-applications-by-profile-key.service'
// import { ResolveProfile } from '../../core/sndomain/profile/resolve-profile.service'

const focusRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview'
  },
  {
    path: 'overview',
    component: DummyComponent,
  },
  {
    path: 'job/:jobKey',
    component: DummyComponent,
  },
  {
    path: 'opp/:oppKey',
    component: DummyComponent,
  }
]
const routes: Routes = [
  {
    path: ':projectKey',
    component: RoutedHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: DummyOutletComponent,
        children: focusRoutes,
      },
      {
        path: 'recruit',
        component: DummyOutletComponent,
        children: focusRoutes,
      },
      {
        path: 'schedule',
        component: DummyOutletComponent,
        children: focusRoutes,
      },
      {
        path: 'roster',
        component: DummyOutletComponent,
        children: focusRoutes,
      },
      {
        path: 'onsite',
        component: DummyOutletComponent,
        children: focusRoutes,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizeRoutingModule { }

export const routedComponents = [
  RoutedHomeComponent,
  DummyComponent,
  DummyOutletComponent,
]
