import { Component } from '@angular/core';

import { MyProfileStateService } from '../my-profile.state'

@Component({
  selector: 'my-profile-home-page',
  template: `
<div>
  <h1>My Profile</h1>
  <button (click)='signOut()'>sign out</button>
  {{ state.user$ | async | json }}
</div>
`
})

export class MyProfileHomePageComponent {
  constructor(
    public state: MyProfileStateService,
  ) {}

  public signOut() {
    this.state.signOut()
  }
}
