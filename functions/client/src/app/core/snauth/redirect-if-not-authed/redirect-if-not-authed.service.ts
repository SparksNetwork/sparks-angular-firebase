import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/map'

@Injectable()
export class RedirectIfNotAuthed implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState
      .map(authState => authState ? true : false)
      .do(isAuthed => {
        console.log('unlessAuthed:isAuthed', isAuthed)
        if (!isAuthed) {
          console.log('navigating with redirect',state.url)
          this.router.navigate(['/auth', state.url, 'signin'])
        }
      })
      .first()
  }
}