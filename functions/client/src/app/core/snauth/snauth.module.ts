import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth'

import { AuthService } from './auth/auth.service'
import { RequireAuth } from './require-auth/require-auth.service'
import { RedirectIfNotAuthed } from './redirect-if-not-authed/redirect-if-not-authed.service'
import { RedirectIfAuthed } from './redirect-if-authed/redirect-if-authed.service'
import { FirstAuth } from './first-auth/first-auth.service'
import { RequireEmailVerification } from "./require-email-verification/require-email-verification.service";
import { RequireNoEmailVerification } from './require-no-email-verification/require-no-email-verification.service'

@NgModule({
  imports: [
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    RequireAuth,
    RedirectIfNotAuthed,
    RedirectIfAuthed,
    FirstAuth,
    RequireEmailVerification,
    RequireNoEmailVerification,
  ],
})
export class SNAuthModule { }
