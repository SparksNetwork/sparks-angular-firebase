import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth'

import { ProviderFacebook } from './provider-facebook/provider-facebook.service';
import { ProviderGoogle } from './provider-google/provider-google.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ProviderFacebook,
    ProviderGoogle,
  ],
})
export class SNAuthModule { }
