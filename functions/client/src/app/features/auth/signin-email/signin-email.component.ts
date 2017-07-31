import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailPasswordFormComponent } from '../email-password-form/email-password-form.component'

import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'auth-signin-email',
  templateUrl: 'signin-email.component.html'
})

export class SigninEmailComponent {
  @ViewChild(EmailPasswordFormComponent) public epForm: EmailPasswordFormComponent

  constructor(public afAuth: AngularFireAuth) { }

  public signIn($event) {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
  }
}
