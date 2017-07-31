import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

import 'rxjs/add/operator/first'

@Injectable()
export class FirstAuth implements Resolve<firebase.User> {
  constructor(public afAuth: AngularFireAuth) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState
      .do(authState => console.log('authState', authState))
      .first()
  }
}