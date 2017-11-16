import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppbarStateService } from '../appbar.state'

@Component({
  selector: 'appbar-home-page',
  template: `
<div id='appbar'>
  <a [routerLink]='["/"]'>SN Logo</a>
  <button *ngIf='!(state.isAuthed$ | async)' (click)='navigateToSignIn()'>sign in</button>
  <a *ngIf='state.isAuthed$ | async' [routerLink]='["/my-profile"]'>profile</a>
</div>
<router-outlet></router-outlet>
`
})

export class AppbarHomePageComponent {
  public isAuthed: boolean;

  constructor(
    private router: Router,
    public state: AppbarStateService,
  ) {}

  navigateToSignIn() {
    this.router.navigate(['/auth', this.router.url, 'signin'])
  }

}
