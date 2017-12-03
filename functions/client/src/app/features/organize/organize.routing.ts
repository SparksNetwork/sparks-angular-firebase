import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DummyComponent } from './dummy.component'

import { RedirectToJoinIfNotUser } from '../../core/user/redirect-to-join-if-not-user.guard'

import { OrganizeStartPageComponent } from './pages/organize-start-page.component'
import { OrganizeNavPageComponent } from './pages/organize-nav-page.component'
import { OrganizeProjectHomePageComponent } from './pages/organize-project-home-page.component'
import { OrganizeProjectHomeCreateTeamPageComponent } from './pages/organize-project-home-create-team-page.component'

export const routedComponents = [
  OrganizeStartPageComponent,
  OrganizeNavPageComponent,
  OrganizeProjectHomePageComponent,
  OrganizeProjectHomeCreateTeamPageComponent,
]

const routes: Routes = [
  {
    path: 'start',
    component: OrganizeStartPageComponent,
    canActivate: [
      RedirectToJoinIfNotUser,
    ]
  },
  {
    path: ':projectKey',
    component: OrganizeNavPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'project/overview',
      },
      {
        path: 'project/overview',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: OrganizeProjectHomePageComponent,
              },
              {
                path: 'create-team',
                component: OrganizeProjectHomeCreateTeamPageComponent,
              }
            ]
          }
        ]
      },
      {
        path: 'team/:teamKey',
        component: DummyComponent,
      },
      {
        path: 'opp/:oppKey',
        component: DummyComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizeRoutingModule { }

