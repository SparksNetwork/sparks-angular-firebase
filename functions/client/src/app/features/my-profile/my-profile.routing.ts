import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProfileHomePageComponent } from './components/my-profile-home-page.component'

import { RedirectToJoinIfNotUser } from '../../core/user/redirect-to-join-if-not-user.guard'

export const routedComponents = [
  MyProfileHomePageComponent,
]

const routes: Routes = [
  {
    path: '',
    component: MyProfileHomePageComponent,
    canActivate: [
      RedirectToJoinIfNotUser,
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
