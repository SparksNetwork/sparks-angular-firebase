import { Component, ViewChild } from '@angular/core';

import { AuthService } from "../../../core/snauth/auth/auth.service";
import { FormEmailPasswordComponent } from "../form-email-password/form-email-password.component";

@Component({
  selector: 'auth-page-signin',
  templateUrl: 'page-signin.component.html'
})

export class PageSigninComponent {
  @ViewChild(FormEmailPasswordComponent) public epForm: FormEmailPasswordComponent

  constructor(private auth: AuthService) { }

  signInWithEmailAndPassword() {
    this.auth.signInWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
  }
}