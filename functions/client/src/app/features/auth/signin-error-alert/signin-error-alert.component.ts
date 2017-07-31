import { Component } from '@angular/core'
import { AuthService } from '../../../core/snauth/auth/auth.service'

import { Observable } from 'rxjs'

@Component({
  selector: 'auth-signin-error-alert',
  templateUrl: 'signin-error-alert.component.html'
})

export class SigninErrorAlertComponent {
  public message: string

  constructor(
    public auth: AuthService
  ) {
    this.auth.errorMessage.subscribe(msg => { this.message = msg })
  }

}
