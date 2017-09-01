import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService, AuthError } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html'
})
export class PageResetPasswordComponent implements OnInit {

  public passwordResetEmailForm: FormGroup
  public resetEmailSentTo: string;
  public showErrors: boolean = false;

  constructor(
    public builder: FormBuilder,
    public auth: AuthService,
  ) {
    this.passwordResetEmailForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public sendPasswordResetEmail() {
    if (!this.passwordResetEmailForm.valid) {
      this.showErrors = true;
      return;
    }
    this.resetEmailSentTo = null;

    this.auth.sendPasswordResetEmail(this.passwordResetEmailForm.value.email).then((email) => {
      if (!email) return;

      this.resetEmailSentTo = email;
      this.passwordResetEmailForm.reset();
    })
  }

  public onKeyUp() {
    this.showErrors = false;
  }

  ngOnInit() {
  }
}
