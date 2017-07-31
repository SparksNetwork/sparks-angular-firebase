import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Component({
  selector: 'auth-email-password-form',
  templateUrl: 'email-password-form.component.html'
})

export class EmailPasswordFormComponent implements OnInit {
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