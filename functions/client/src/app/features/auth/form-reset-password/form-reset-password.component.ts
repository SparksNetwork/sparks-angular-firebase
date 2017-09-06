import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form-reset-password',
  templateUrl: './form-reset-password.component.html'
})
export class FormResetPasswordComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  public showErrors = false;
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

  public onKeyUp() {
    this.showErrors = false;
  }

  public submit() {
    if (!this.resetPasswordForm.valid) {
      this.showErrors = true;
      return;
    }

    this.onSubmit.emit({ password: this.resetPasswordForm.value.password })
  }

}
