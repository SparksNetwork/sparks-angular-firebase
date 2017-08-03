import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSigninComponent } from './page-signin/page-signin.component'
import { PageSigninEmailComponent } from './page-signin-email/page-signin-email.component'
import { PageSigninSocialComponent } from './page-signin-social/page-signin-social.component'
import { PageSignoutComponent } from './page-signout/page-signout.component'
import { PageEmailActionHandlerComponent } from "./page-email-action-handler/page-email-action-handler.component"
import { PageEmailNotVerifiedComponent } from "./page-email-not-verified/page-email-not-verified.component";

import { RedirectIfAuthed } from '../../core/snauth/redirect-if-authed/redirect-if-authed.service'
import { RedirectIfNotAuthed } from '../../core/snauth/redirect-if-not-authed/redirect-if-not-authed.service'
import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireNoEmailVerification } from '../../core/snauth/require-no-email-verification/require-no-email-verification.service'
import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'

export const routedComponents = [
  PageSigninComponent,
  PageSigninEmailComponent,
  PageSigninSocialComponent,
  PageSignoutComponent,
  PageEmailActionHandlerComponent,
  PageEmailNotVerifiedComponent
];

const routes: Routes = [
  {
    path: "email-action-handler",
    component: PageEmailActionHandlerComponent,
    canActivate: [
      RequireNoEmailVerification,
    ]
  },
  {
    path: 'email-not-verified',
    component: PageEmailNotVerifiedComponent,
    canActivate: [
      RequireNoEmailVerification,
      RequireAuth,
    ]
  },
  {
    path: ':redirectUrl',
    resolve: [
      FirstAuth,
    ],
    children: [
      {
        path: 'signin',
        component: PageSigninComponent,
        canActivate: [
          RedirectIfAuthed,
        ],
        children: [
          {
            path: '',
            component: PageSigninSocialComponent,
          },
          {
            path: 'email',
            component: PageSigninEmailComponent,
          },
        ]
      },
      {
        path: 'signout',
        component: PageSignoutComponent,
        canActivate: [
          RedirectIfNotAuthed,
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
