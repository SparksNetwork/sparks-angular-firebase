import { Component, ViewChild } from '@angular/core'

import { AuthService } from '../../../core/snauth/auth/auth.service'
import { FormEmailPasswordComponent } from '../form-email-password/form-email-password.component'

@Component({
  selector: 'auth-page-signin-email',
  templateUrl: 'page-signin-email.component.html'
})

export class PageSigninEmailComponent {
  @ViewChild(FormEmailPasswordComponent) public epForm: FormEmailPasswordComponent

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
