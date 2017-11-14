import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserService } from './user.service'

import 'rxjs/add/operator/first'

@Injectable()
export class AwaitFirstAuth implements Resolve<boolean> {
  constructor(
    public userService: UserService
  ) { }

  resolve() {
    return this.userService.isAuthed$.take(1)
  }

}
