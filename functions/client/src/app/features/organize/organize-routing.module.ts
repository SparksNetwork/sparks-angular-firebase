import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DummyComponent } from './dummy.component'
import { DummyOutletComponent } from './dummy-outlet.component'

import { RoutedHomeComponent } from './routed-home'
import { RoutedHomeOverviewComponent } from './routed-home-overview'

// import { HomeComponent } from './home.component';
// import { ResolveProjectAll } from '../../core/sndomain/project/resolve-project-all.service'
// import { HomeAllProjectsComponent } from './home-all-projects/home-all-projects.component'
// import { ResolveApplicationByProfileKey } from '../../core/sndomain/application/resolve-applications-by-profile-key.service'
// import { ResolveProfile } from '../../core/sndomain/profile/resolve-profile.service'

function focusRoutesFor(OverviewComponent: any, JobComponent: any, OppComponent: any): Routes {
  return [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    },
    {
      path: 'overview',
      component: OverviewComponent,
    },
    {
      path: 'job/:jobKey',
      component: JobComponent,
    },
    {
      path: 'opp/:oppKey',
      component: OppComponent,
    }
  ]
}

// const focusRoutes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'overview'
//   },
//   {
//     path: 'overview',
//     component: RoutedHomeOverviewComponent,
//   },
//   {
//     path: 'job/:jobKey',
//     component: DummyComponent,
//   },
//   {
//     path: 'opp/:oppKey',
//     component: DummyComponent,
//   }
// ]

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
        // component: DummyOutletComponent,
        children: focusRoutesFor(RoutedHomeOverviewComponent, DummyComponent, DummyComponent),
      },
      {
        path: 'recruit',
        // component: DummyOutletComponent,
        children: focusRoutesFor(DummyComponent, DummyComponent, DummyComponent),
      },
      {
        path: 'schedule',
        // component: DummyOutletComponent,
        children: focusRoutesFor(DummyComponent, DummyComponent, DummyComponent),
      },
      {
        path: 'roster',
        // component: DummyOutletComponent,
        children: focusRoutesFor(DummyComponent, DummyComponent, DummyComponent),
      },
      {
        path: 'onsite',
        // component: DummyOutletComponent,
        children: focusRoutesFor(DummyComponent, DummyComponent, DummyComponent),
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
  RoutedHomeOverviewComponent,
  DummyComponent,
  DummyOutletComponent,
]
