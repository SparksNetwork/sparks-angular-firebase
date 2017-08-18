import { Component, Input } from '@angular/core';

import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'auth-social-block',
  templateUrl: './social-block.component.html',
})
export class SocialBlockComponent {
  @Input() label: string;

  constructor(private auth: AuthService) { }

  public signInWithFacebook() {
    this.auth.signInWithFacebook()
  }

  public signInWithGoogle() {
    this.auth.signInWithGoogle()
  }
}
