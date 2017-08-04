import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html'
})
export class PageResetPasswordComponent implements OnInit {

  public passwordResetEmailForm: FormGroup

  constructor(
    public builder: FormBuilder,
    public auth: AuthService,
  ) {
    this.passwordResetEmailForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public sendPasswordResetEmail() {
    this.auth.sendPasswordResetEmail(this.passwordResetEmailForm.value.email).then(() => {
      console.log("email sent")
    });
  }

  ngOnInit() {
  }
}
