import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'

import { RedirectIfNotUser } from '../../core/user/redirect-if-not-user.guard'

import { MyProfileHomePageComponent } from './components/my-profile-home-page.component'

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
    // resolve: [
    //   FirstAuth,
    // ],
    // children: [
    //   {
    //     path: '',
    //     loadChildren: '../explore/explore.module#ExploreModule',
    //   },
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
export class MyProfileRoutingModule { }

