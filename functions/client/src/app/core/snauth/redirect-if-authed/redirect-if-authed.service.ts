import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { AuthService } from '../auth/auth.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/map'

@Injectable()
export class RedirectIfAuthed implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.auth.isAuthed
      .do(isAuthed => {
        if (isAuthed) {
          this.router.navigate([route.parent.paramMap.get('redirectUrl')])
        }
      })
      .map(isAuthed => !isAuthed)
      .take(1)
  }
}