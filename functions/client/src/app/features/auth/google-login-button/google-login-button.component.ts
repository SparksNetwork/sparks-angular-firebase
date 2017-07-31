import { Component, OnInit } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'

import { ProviderGoogle } from '../../../core/snauth/provider-google/provider-google.service'

@Component({
  selector: 'auth-google-login-button',
  templateUrl: 'google-login-button.component.html'
})

export class GoogleLoginButtonComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private providerGoogle: ProviderGoogle,
  ) {}

  click() {
    this.afAuth.auth.signInWithRedirect(this.providerGoogle)
  }
}
