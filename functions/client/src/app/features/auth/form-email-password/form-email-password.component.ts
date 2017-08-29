import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Component({
  selector: 'auth-form-email-password',
  templateUrl: 'form-email-password.component.html'
})

export class FormEmailPasswordComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

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

  public submit() {    
    if (!this.credentialsForm.valid) return;

    this.onSubmit.emit({ email: this.credentialsForm.value.email, password: this.credentialsForm.value.password })
  }
}