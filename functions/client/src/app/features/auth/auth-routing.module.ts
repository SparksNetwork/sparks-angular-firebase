import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component'
import { SigninEmailComponent } from './signin-email/signin-email.component'
import { SigninSocialComponent } from './signin-social/signin-social.component'
import { SignoutComponent } from './signout/signout.component'
import { RedirectIfAuthed } from '../../core/snauth/redirect-if-authed/redirect-if-authed.service'
import { RedirectIfNotAuthed } from '../../core/snauth/redirect-if-not-authed/redirect-if-not-authed.service'
import { RequireAuth } from '../../core/snauth/require-auth/require-auth.service'
import { RequireNoEmailVerification } from '../../core/snauth/require-no-email-verification/require-no-email-verification.service'
import { FirstAuth } from '../../core/snauth/first-auth/first-auth.service'
import { EmailActionHandlerComponent } from "./email-action-handler/email-action-handler.component";
import { EmailNotVerifiedComponent } from "./email-not-verified/email-not-verified.component";

export const routedComponents = [
  SigninComponent,
  SigninEmailComponent,
  SigninSocialComponent,
  SignoutComponent,
  EmailActionHandlerComponent,
  EmailNotVerifiedComponent
];

const routes: Routes = [
  {
    path: "email-action-handler",
    component: EmailActionHandlerComponent,
    canActivate: [
      RequireNoEmailVerification,
    ]
  },
  {
    path: 'email-not-verified',
    component: EmailNotVerifiedComponent,
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
