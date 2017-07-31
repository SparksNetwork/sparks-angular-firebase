import { Component, OnInit } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'

import { ProviderFacebook } from '../../../core/snauth/provider-facebook/provider-facebook.service'

@Component({
  selector: 'auth-facebook-login-button',
  templateUrl: 'facebook-login-button.component.html'
})

export class FacebookLoginButtonComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private providerFacebook: ProviderFacebook,
  ) {}

  click() {
    this.afAuth.auth.signInWithRedirect(this.providerFacebook)
  }
}
