import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailPasswordFormComponent } from '../email-password-form/email-password-form.component'

@Component({
  selector: 'auth-signin',
  templateUrl: 'signin.component.html'
})

export class SigninComponent implements OnInit {
  @ViewChild(EmailPasswordFormComponent) public epForm: EmailPasswordFormComponent

  constructor() { }

  ngOnInit() { }
}