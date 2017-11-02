import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'

import { AppbarComponent } from './appbar.component'

const routes: Routes = [
  {
    path: '',
    component: AppbarComponent,
    resolve: [
      FirstAuth,
    ],
    children: [
      {
        path: '',
        loadChildren: '../explore/explore.module#ExploreModule'
      },
      {
        path: 'organize',
        loadChildren: '../organize/organize.module#OrganizeModule'
      },
      {
        path: 'get-involved',
        loadChildren: '../project/project.module#ProjectModule',
      },
      {
        path: 'apply',
        loadChildren: '../apply/apply.module#ApplyModule',
      },
      {
        path: 'your-application',
        loadChildren: '../your-application/your-application.module#YourApplicationModule',
      },
      {
        path: 'your-profile',
        loadChildren: '../your-profile/your-profile.module#YourProfileModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppbarRoutingModule { }

export const routedComponents = [
  AppbarComponent,
]
