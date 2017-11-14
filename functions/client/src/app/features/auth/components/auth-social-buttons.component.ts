import { Component, Input } from '@angular/core'

import { AuthStateService } from '../auth.state'

@Component({
  selector: 'auth-social-buttons',
  template: `
<button (click)='signInWithFacebook()'>with facebook</button>
<button (click)='signInWithGoogle()'>with google</button>
`
})
export class AuthSocialButtonsComponent {
  constructor(
    public authState: AuthStateService,
  ) { }

  public signInWithFacebook() {
    this.authState.signInWithFacebook()
  }

  public signInWithGoogle() {
    this.authState.signInWithGoogle()
  }
}
