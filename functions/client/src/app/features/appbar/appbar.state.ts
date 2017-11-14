import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { UserService } from '../../core/user/user.service'

@Injectable()
export class AppbarStateService {
  public isAuthed$: Observable<boolean>

  constructor(
    public userService: UserService
  ) {
    this.isAuthed$ = userService.isAuthed$
  }

}
