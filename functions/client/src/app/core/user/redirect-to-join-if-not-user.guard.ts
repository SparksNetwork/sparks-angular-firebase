import { Injectable } from '@angular/core'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router'

import { UserService } from './user.service'

@Injectable()
export class RedirectToJoinIfNotUser implements CanActivate {
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
