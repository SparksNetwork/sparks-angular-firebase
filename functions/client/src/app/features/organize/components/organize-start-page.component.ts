import { Component, OnInit } from '@angular/core';

// import { AuthService } from '../../core/snauth/auth/auth.service';
// import { AppbarStateService } from '../appbar.state'

@Component({
  selector: 'organize-start-page',
  template: `
<div>
  <h1>Start Organizing</h1>
  <p>form</p>
</div>
`
})

export class OrganizeStartPageComponent implements OnInit {
  // public isAuthed: boolean;

  constructor(
    // private auth: AuthService,
    // private router: Router,
    // public state: AppbarStateService,
  ) {
    // this.auth.isAuthed.subscribe(isAuthed => this.isAuthed = isAuthed)
  }

  ngOnInit() { }

  // navigateToSignIn() {
  //   this.router.navigate(['/auth', this.router.url, 'signin'])
  // }

}
