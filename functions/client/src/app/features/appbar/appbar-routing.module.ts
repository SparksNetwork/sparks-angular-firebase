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
        path: 'dash',
        loadChildren: '../dash/dash.module#DashModule',
      },
      {
        path: '',
        loadChildren: '../home/home.module#HomeModule',
      },
      {
        path: 'project',
        loadChildren: '../project/project.module#ProjectModule',
      },
      {
        path: 'apply',
        loadChildren: '../apply/apply.module#ApplyModule',
      },
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