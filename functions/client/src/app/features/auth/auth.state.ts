import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { UserService } from '../../core/user/user.service'

@Injectable()
export class AuthStateService {
  public isAuthed$: Observable<boolean>

  constructor(
    public userService: UserService
  ) {
    this.isAuthed$ = userService.isAuthed$
  }

  public signInWithFacebook() {
    this.userService.signInWithFacebook()
  }

  public signInWithGoogle() {
    this.userService.signInWithGoogle()
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    this.userService.signInWithEmailAndPassword(email, password)
  }

  public createWithEmailAndPassword(email: string, password: string) {
    this.userService.createWithEmailAndPassword(email, password)
  }
}
