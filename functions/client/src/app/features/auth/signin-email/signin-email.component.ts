import { Component, ViewChild } from '@angular/core'

import { AuthService } from '../../../core/snauth/auth/auth.service'
import { EmailPasswordFormComponent } from '../email-password-form/email-password-form.component'

@Component({
  selector: 'auth-signin-email',
  templateUrl: 'signin-email.component.html'
})

export class SigninEmailComponent {
  @ViewChild(EmailPasswordFormComponent) public epForm: EmailPasswordFormComponent

  constructor(
    public auth: AuthService,
  ) { }

  public signIn() {
    this.auth.signInWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
  }

  public create() {
    this.auth.createWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
  }
}
