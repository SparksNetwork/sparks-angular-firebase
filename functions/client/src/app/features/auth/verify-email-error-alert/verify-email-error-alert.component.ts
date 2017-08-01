import { Component } from '@angular/core'
import { AuthService } from '../../../core/snauth/auth/auth.service'

import { Observable } from 'rxjs'

@Component({
  selector: 'auth-verify-email-error-alert',
  templateUrl: 'verify-email-error-alert.component.html'
})

export class VerifyEmailErrorAlertComponent {
  public message: string

  constructor(
    public auth: AuthService
  ) {
    this.auth.errorMessage.subscribe(msg => { this.message = msg })
  }
}
