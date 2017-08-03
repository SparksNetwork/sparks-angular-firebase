import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth/auth.service'

import 'rxjs/add/operator/first'

@Injectable()
export class FirstAuth implements Resolve<boolean> {
  constructor(public auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isAuthed.first()
  }
}