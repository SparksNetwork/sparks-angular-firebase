import { Component } from '@angular/core'

import { AuthService } from '../../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-facebook-login-button',
  templateUrl: 'facebook-login-button.component.html'
})

export class FacebookLoginButtonComponent {
  constructor(
    private auth: AuthService,
  ) {}

  click() {
    this.auth.signInWithFacebook()
  }
}
