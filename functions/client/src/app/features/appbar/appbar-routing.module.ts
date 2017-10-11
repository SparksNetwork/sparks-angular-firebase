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
        loadChildren: '../home/home.module#HomeModule',
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
