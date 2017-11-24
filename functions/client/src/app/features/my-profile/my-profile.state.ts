import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { UserService, User } from '../../core/user/user.service'

@Injectable()
export class MyProfileStateService {
  public user$: Observable<User>

  constructor(
    public userService: UserService
  ) {
    this.user$ = userService.current$
  }

  public signOut() {
    this.userService.signOut()
  }
}
