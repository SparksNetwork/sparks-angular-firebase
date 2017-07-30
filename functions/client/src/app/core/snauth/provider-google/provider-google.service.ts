import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Injectable()
export class ProviderGoogle extends firebase.auth.GoogleAuthProvider {

  constructor(public afAuth: AngularFireAuth) {
    super()
    this.addScope('email')
  }

}
