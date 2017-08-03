import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppbarComponent } from './appbar.component'

const routes: Routes = [
  {
    path: '',
    component: AppbarComponent,
    children: [
      {
        path: '',
        loadChildren: '../home/home.module#HomeModule',
      },
      {
        path: 'project',
        loadChildren: '../project/project.module#ProjectModule',
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