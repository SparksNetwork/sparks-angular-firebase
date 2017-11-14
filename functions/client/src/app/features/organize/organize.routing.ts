import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'
import { RedirectToJoinIfNotUser } from '../../core/user/redirect-to-join-if-not-user.guard'

import { OrganizeStartPageComponent } from './components/organize-start-page.component'

export const routedComponents = [
  OrganizeStartPageComponent,
]

const routes: Routes = [
  {
    path: 'start',
    component: OrganizeStartPageComponent,
    canActivate: [
      RedirectToJoinIfNotUser,
    ]
    // resolve: [
    //   FirstAuth,
    // ],
      // {
      //   path: 'get-involved',
      //   loadChildren: '../project/project.module#ProjectModule',
      // },
      // {
      //   path: 'apply',
      //   loadChildren: '../apply/apply.module#ApplyModule',
      // },
      // {
      //   path: 'your-application',
      //   loadChildren: '../your-application/your-application.module#YourApplicationModule',
      // },
      // {
      //   path: 'your-profile',
      //   loadChildren: '../your-profile/your-profile.module#YourProfileModule',
      // }
    // ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizeRoutingModule { }

