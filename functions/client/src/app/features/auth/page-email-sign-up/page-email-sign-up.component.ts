import { Component, ViewChild } from '@angular/core';

import { FormEmailPasswordComponent } from "../form-email-password/form-email-password.component";
import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-page-email-sign-up',
  templateUrl: './page-email-sign-up.component.html', 
})
export class PageEmailSignUpComponent {
  @ViewChild(FormEmailPasswordComponent) public epForm: FormEmailPasswordComponent

  constructor(private auth: AuthService) { }  

  public createWithEmailAndPassword() {
    this.auth.createWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
  }
}
