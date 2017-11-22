import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppbarStateService } from '../appbar.state'

@Component({
  selector: 'appbar-home-page',
  template: `
<div id='appbar' class='ui fixed borderless menu'>
  <div class='ui container'>
    <a class='item' [routerLink]='["/"]'>
      <img src="assets/img/logo_sparksnetwork.svg" alt="sparks.network"/>
    </a>
    <div class='ui right floated item'>
      <button class='ui minor right floated button' *ngIf='!(state.isAuthed$ | async)' (click)='navigateToSignIn()'>
        sign in
      </button>
      <button class='circular ui icon button' *ngIf='state.isAuthed$ | async' [routerLink]='["/my-profile"]'>
        <i class='large user outline icon'></i>
      </button>
    </div>
  </div>
</div>
<div class='appbar-offset'>
  <router-outlet></router-outlet>
</div>
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
