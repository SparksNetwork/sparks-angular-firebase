import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Component({
  selector: 'auth-form-email-password',
  templateUrl: 'form-email-password.component.html'
})

export class FormEmailPasswordComponent implements OnInit {
  public credentialsForm: FormGroup

  constructor(
    public builder: FormBuilder,
  ) {
    this.credentialsForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }
}