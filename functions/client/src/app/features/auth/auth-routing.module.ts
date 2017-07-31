import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component'
import { SigninEmailComponent } from './signin-email/signin-email.component'
import { SigninSocialComponent } from './signin-social/signin-social.component'
import { SignoutComponent } from './signout/signout.component'
import { RedirectIfAuthed } from '../../core/snauth/redirect-if-authed/redirect-if-authed.service'
import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'

export const routedComponents = [
  SigninComponent,
  SigninEmailComponent,
  SigninSocialComponent,
  SignoutComponent,
];

const routes: Routes = [
  {
    path: ':redirectUrl',
    resolve: [
      FirstAuth,
    ],
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [
          RedirectIfAuthed,
        ],
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
      },
      {
        path: 'signout',
        component: SignoutComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
