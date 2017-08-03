import { Component } from '@angular/core'
import { AuthService } from '../../../core/snauth/auth/auth.service'

import { Observable } from 'rxjs'

@Component({
  selector: 'auth-alert-error',
  templateUrl: 'alert-error.component.html'
})

export class AlertErrorComponent {
  public message: string

  constructor(
    public auth: AuthService
  ) {
    this.auth.errorMessage.subscribe(msg => { this.message = msg })
  }

}
