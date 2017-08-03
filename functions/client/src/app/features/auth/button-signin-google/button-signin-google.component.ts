import { Component } from '@angular/core'
import { AuthService } from '../../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-button-signin-google',
  templateUrl: 'button-signin-google.component.html'
})

export class ButtonSigninGoogleComponent {
  constructor(
    public auth: AuthService,
  ) {}

  click() {
    this.auth.signInWithGoogle()
  }
}
