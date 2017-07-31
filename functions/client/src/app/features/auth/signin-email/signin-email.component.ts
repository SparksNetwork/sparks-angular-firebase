import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { EmailPasswordFormComponent } from '../email-password-form/email-password-form.component'

import { AngularFireAuth } from 'angularfire2/auth'
import { FirebaseError } from 'firebase/app'

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

  public ngOnInit() {
    this.epForm.credentialsForm.valueChanges.subscribe(values => {
      this.email = values['email']
      this.password = values['password']
    })
  }

  public signIn($event) {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => this.router.navigate([this.route.snapshot.parent.parent.params['redirectUrl']]))
      .catch((error: FirebaseError) => {
        this.error = error
      })
  }

  public create($event) {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password))
      .then(() => this.router.navigate([this.route.snapshot.parent.parent.params['redirectUrl']]))
      .catch((error: FirebaseError) => {
        this.error = error
      })
  }
}
