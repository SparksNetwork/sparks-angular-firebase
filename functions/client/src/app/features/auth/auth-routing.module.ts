import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component'
import { SigninEmailComponent } from './signin-email/signin-email.component'
import { SigninSocialComponent } from './signin-social/signin-social.component'

export const routedComponents = [
  SigninComponent,
  SigninEmailComponent,
  SigninSocialComponent,
];

const routes: Routes = [
  {
    path: ':redirectUrl',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        children: [
          {
            path: '',
            component: SigninSocialComponent,
          },
          {
            path: 'email',
            component: SigninEmailComponent,
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
