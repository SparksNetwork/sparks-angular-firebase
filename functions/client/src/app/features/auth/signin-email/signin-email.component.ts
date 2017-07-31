import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseError } from 'firebase/app'

import { EmailPasswordFormComponent } from '../email-password-form/email-password-form.component'

@Component({
  selector: 'auth-signin-email',
  templateUrl: 'signin-email.component.html'
})

export class SigninEmailComponent implements OnInit {
  @ViewChild(EmailPasswordFormComponent) public epForm: EmailPasswordFormComponent

  public error: FirebaseError
  public email: string
  public password: string

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  public redirect() {
    this.router.navigate([this.route.snapshot.parent.parent.params['redirectUrl']])
  }

  public handleError(error: FirebaseError) {
    this.error = error
  }

  public signIn($event) {
    this.error = null
    this.afAuth.auth.signInWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
      .then(() => this.redirect())
      .catch((err: FirebaseError) => this.handleError(err))
  }

  public create($event) {
    this.error = null
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
      .then(result => this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password))
      .then(() => this.redirect())
      .catch((err: FirebaseError) => this.handleError(err))
  }
}
