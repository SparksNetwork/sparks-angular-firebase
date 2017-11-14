import { Component, OnInit } from '@angular/core';

// import { AuthService } from '../../core/snauth/auth/auth.service';
// import { AppbarStateService } from '../appbar.state'
import { UserService } from '../../../core/user/user.service'

@Component({
  selector: 'my-profile-home-page',
  template: `
<div>
  <h1>My Profile</h1>
  <button (click)='signOut()'>sign out</button>
</div>
`
})

export class MyProfileHomePageComponent implements OnInit {
  // public isAuthed: boolean;

  constructor(
    public userService: UserService,
    // private auth: AuthService,
    // private router: Router,
    // public state: AppbarStateService,
  ) {
    // this.auth.isAuthed.subscribe(isAuthed => this.isAuthed = isAuthed)
  }

  ngOnInit() { }

  public signOut() {
    this.userService.signOut()
  }
  // navigateToSignIn() {
  //   this.router.navigate(['/auth', this.router.url, 'signin'])
  // }

}
