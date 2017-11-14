import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AuthService } from '../../core/snauth/auth/auth.service';
import { AppbarStateService } from '../appbar.state'

@Component({
  selector: 'appbar-home-page',
  template: `
<div>
  <a [routerLink]='["/"]'>SN Logo</a>
  <button *ngIf='!(state.isAuthed$ | async)' (click)='navigateToSignIn()'>sign in</button>
  <a *ngIf='state.isAuthed$ | async' [routerLink]='["/my-profile"]'>profile</a>
</div>
<router-outlet></router-outlet>
`
})

export class AppbarHomePageComponent implements OnInit {
  public isAuthed: boolean;

  constructor(
    // private auth: AuthService,
    private router: Router,
    public state: AppbarStateService,
  ) {
    // this.auth.isAuthed.subscribe(isAuthed => this.isAuthed = isAuthed)
  }

  ngOnInit() { }

  navigateToSignIn() {
    this.router.navigate(['/auth', this.router.url, 'signin'])
  }

}
