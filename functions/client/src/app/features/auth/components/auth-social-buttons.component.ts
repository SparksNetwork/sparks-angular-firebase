import { Component, Input } from '@angular/core'

// import { AuthService } from "../../../core/snauth/auth/auth.service";
import { AuthStateService } from '../auth.state'

@Component({
  selector: 'auth-social-buttons',
  template: `
<button (click)='signInWithFacebook()'>facebook</button>
<button (click)='signInWithGoogle()'>google</button>
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
