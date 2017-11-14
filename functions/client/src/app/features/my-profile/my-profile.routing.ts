import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProfileHomePageComponent } from './components/my-profile-home-page.component'

import { RedirectIfNotUser } from '../../core/user/redirect-if-not-user.guard'

export const routedComponents = [
  MyProfileHomePageComponent,
]

const routes: Routes = [
  {
    path: '',
    component: MyProfileHomePageComponent,
    canActivate: [
      RedirectIfNotUser,
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
