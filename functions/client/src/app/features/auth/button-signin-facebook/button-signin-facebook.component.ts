import { Component } from '@angular/core'

import { AuthService } from '../../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-button-signin-facebook',
  templateUrl: 'button-signin-facebook.component.html'
})

export class ButtonSigninFacebookComponent {
  constructor(
    private auth: AuthService,
  ) {}

  click() {
    this.auth.signInWithFacebook()
  }
}
