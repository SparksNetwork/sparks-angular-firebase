import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, AuthError } from '../../../core/snauth/auth/auth.service';
import { FormResetPasswordComponent } from '../form-reset-password/form-reset-password.component';

@Component({
  selector: 'auth-page-email-action-handler',
  templateUrl: './page-email-action-handler.component.html'
})
export class PageEmailActionHandlerComponent {
  public mode: string
  public oobCode: string
  public title: string
  public verificationEmailExpired = false;
  public resetPasswordEmail: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.mode = this.route.snapshot.queryParamMap.get('mode')
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode')

    if (!this.mode || !this.oobCode) {
      // TODO remain on the same page or redirect to dash?
      console.log('invalid link');
      this.router.navigate(['']);
    }

    this.auth.error.subscribe(error => {
      if (this.mode == 'verifyEmail' && error.code == 'auth/expired-action-code') {
        this.verificationEmailExpired = true;
      }
    })

    switch (this.mode) {
      case 'resetPassword':
        this.title = 'Reset your user password';
        this.auth.verifyPasswordResetCode(this.oobCode).then((email) => {
          if (!email) return;

          this.resetPasswordEmail = email;
        })
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.
        break;
      case 'verifyEmail':
        this.title = 'Verifying your email...'
        this.auth.applyActionCode(this.oobCode).then(() => {
          // location.reload()
          // let redirectUrl = '/'; // eventually from database, where they left off
          // this.router.navigate([redirectUrl]) // will redirect to auth/signin if they need it
        })
        break;
      default:
        // TODO Error: invalid mode.
        console.log('invalid link');
    }
  }

  public signInAndResendVerificationEmail(event) {
    this.auth.signInWithEmailAndPasswordWithoutRedirect(event.email, event.password)
      .then((user) => {
        if (!user) return;
        user.sendEmailVerification().then(() => this.router.navigate(['/']));
      });
  }

  public confirmPasswordReset(event) {
    this.auth.confirmPasswordReset(this.oobCode, event.password)
      .then(() => this.router.navigate(['/']));
  }
}
