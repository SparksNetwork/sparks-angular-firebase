import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth'

import { ProviderFacebook } from './provider-facebook/provider-facebook.service';
import { ProviderGoogle } from './provider-google/provider-google.service';
import { RedirectIfNotAuthed } from './redirect-if-not-authed/redirect-if-not-authed.service'
import { RedirectIfAuthed } from './redirect-if-authed/redirect-if-authed.service'
import { FirstAuth } from './first-auth/first-auth.service'

@NgModule({
  imports: [
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ProviderFacebook,
    ProviderGoogle,
    RedirectIfNotAuthed,
    RedirectIfAuthed,
    FirstAuth,
  ],
})
export class SNAuthModule { }
