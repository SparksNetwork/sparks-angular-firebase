import { Injectable } from '@angular/core'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router'

import { UserService } from './user.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'

@Injectable()
export class RedirectIfNotUser implements CanActivate {
  constructor(
    public userService: UserService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.isAuthed$
      .do(isAuthed => {
        if (!isAuthed) {
          console.log('not authed, redirecting')
          this.router.navigate(['/auth', state.url, 'join'])
        }
      })
      .map(Boolean)
      .take(1)
  }
}
