import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'auth-form-reset-password',
  templateUrl: './form-reset-password.component.html'
})
export class FormResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;

  constructor(
    public builder: FormBuilder,
  ) {
    this.resetPasswordForm = builder.group({
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
