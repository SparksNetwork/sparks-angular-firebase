import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html'  
})
export class PageResetPasswordComponent implements OnInit {

  public passwordResetEmailForm: FormGroup

  constructor(
    public builder: FormBuilder
  ) {
    this.passwordResetEmailForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() {
  }
}
