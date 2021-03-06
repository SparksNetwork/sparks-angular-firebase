import { Injectable } from '@angular/core'
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'

import { UserService } from './user.service'

@Injectable()
export class RedirectIfUser implements CanActivate {
  constructor(
    public userService: UserService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.userService.isAuthed$
      .do(isAuthed => {
        if (isAuthed) {
          this.router.navigate([route.parent.paramMap.get('redirectUrl')])
        }
      })
      .map(isAuthed => !isAuthed)
      .take(1)
  }
}
