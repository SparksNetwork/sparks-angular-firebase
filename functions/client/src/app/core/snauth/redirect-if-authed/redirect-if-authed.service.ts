import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/map'

@Injectable()
export class RedirectIfAuthed implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState
      .map(authState => authState ? true : false)
      .do(isAuthed => {
        if (isAuthed) {
          this.router.navigate([route.paramMap.get('redirectUrl')])
        }
      })
      .map(isAuthed => !isAuthed)
      .first()
  }
}