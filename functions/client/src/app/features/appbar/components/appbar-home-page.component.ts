import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AuthService } from '../../core/snauth/auth/auth.service';

@Component({
  selector: 'appbar-home-page',
  template: `
<div>
  <h1>App bar</h1>
  <button (click)='navigateToSignIn()'>sign in</button>
</div>
<router-outlet></router-outlet>
`
})

export class AppbarHomePageComponent implements OnInit {
  public isAuthed: boolean;

  constructor(
    // private auth: AuthService,
    private router: Router
  ) {
    // this.auth.isAuthed.subscribe(isAuthed => this.isAuthed = isAuthed)
  }

  ngOnInit() { }

  navigateToSignIn() {
    this.router.navigate(['/auth', this.router.url, 'signin'])
  }

}
