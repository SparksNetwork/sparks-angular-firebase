import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth/auth.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/first'

@Injectable()
export class RequireAuth implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isAuthed
      .do(isAuthed => {
        if (!isAuthed) {
          this.router.navigate(['/auth', state.url, 'signin'])
        }
      })
      .take(1)
  }
}