import { Component, ElementRef, Input, EventEmitter, Output, ViewChild } from '@angular/core'
import {  } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { AuthStateService } from '../auth.state'

export interface EmailPasswordInputs {
  email: string,
  password: string,
}

@Component({
  selector: 'auth-email-password-inputs',
  styles: [':host { display: block; }'],
  template: `
<div class='ui fluid big left icon inverted input line'>
  <input (keyup)='email$.next($event.target.value)' type='text' placeholder='enter your email'>
  <i class='mail outline inverted icon'></i>
</div>
<div class='ui fluid big left icon inverted input line'>
  <input (keyup)='password$.next($event.target.value)' type='password' placeholder='enter your password'>
  <i class='privacy inverted icon'></i>
</div>
`
})
export class AuthEmailPasswordInputsComponent {
  public email$ = new BehaviorSubject(null)
  public password$ = new BehaviorSubject(null)

  @Output() public valid$: Observable<Boolean>
  @Output() public values$: Observable<EmailPasswordInputs>

  constructor(
  ) {
    this.values$ = Observable.combineLatest(
      this.email$,
      this.password$,
      (email, password) => ({email, password})
    )

    this.valid$ = this.values$
      .map(({email, password}) => Boolean(email) && Boolean(password))
  }
}
