import { Component } from '@angular/core'
import { AuthService } from '../../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-google-login-button',
  templateUrl: 'google-login-button.component.html'
})

export class GoogleLoginButtonComponent {
  constructor(
    public auth: AuthService,
  ) {}

  click() {
    this.auth.signInWithGoogle()
  }
}
