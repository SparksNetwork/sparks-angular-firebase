import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Injectable()
export class UserService {
  public current: Observable<firebase.User>
  public auth: firebase.auth.Auth

  public googleProvider: firebase.auth.GoogleAuthProvider
  public facebookProvider: firebase.auth.FacebookAuthProvider

  constructor(public afAuth: AngularFireAuth) {
    this.current = afAuth.authState
    this.auth = afAuth.auth

    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.googleProvider.addScope('email')

    this.facebookProvider = new firebase.auth.FacebookAuthProvider()
    this.facebookProvider.addScope('email')
  }

}
