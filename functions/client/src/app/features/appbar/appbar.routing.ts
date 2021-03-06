import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'
import { AwaitFirstAuth } from '../../core/user/await-first-auth.resolver'
import { AppbarHomePageComponent } from './components/appbar-home-page.component'

export const routedComponents = [
  AppbarHomePageComponent,
]

const routes: Routes = [
  {
    path: '',
    component: AppbarHomePageComponent,
    resolve: [
      AwaitFirstAuth,
    ],
    children: [
      {
        path: '',
        loadChildren: '../explore/explore.module#ExploreModule',
      },
      {
        path: 'my-profile',
        loadChildren: '../my-profile/my-profile.module#MyProfileModule'
      },
      {
        path: 'organize',
        loadChildren: '../organize/organize.module#OrganizeModule'
      }
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppbarRoutingModule { }

