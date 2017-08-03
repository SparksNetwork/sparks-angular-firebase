import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService, AuthError } from "../../../core/snauth/auth/auth.service";
import { FormEmailPasswordComponent } from '../form-email-password/form-email-password.component';

@Component({
  selector: 'auth-page-email-action-handler',
  templateUrl: './page-email-action-handler.component.html'
})
export class PageEmailActionHandlerComponent {
  public mode: string
  public oobCode: string
  public title: string
  public verificationEmailExpired: boolean;

  @ViewChild(FormEmailPasswordComponent) public epForm: FormEmailPasswordComponent

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.mode = this.route.snapshot.queryParamMap.get('mode')
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode')

    if (!this.mode || !this.oobCode) {
      // TODO remain on the same page or redirect to dash?
      console.log("invalid link");
      this.router.navigate(['']);
    }

    switch (this.mode) {
      case 'resetPassword':
        // Display reset password handler and UI.        
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.        
        break;
      case 'verifyEmail':
        this.title = 'Verifying your email...'
        this.auth.applyActionCode(this.oobCode).then(() => {
          // location.reload()
          // let redirectUrl = 'dash'; // eventually from database, where they left off
          // this.router.navigate([redirectUrl]) // will redirect to auth/signin if they need it
        }).catch((error: AuthError) => {
          if (error.code == "auth/expired-action-code") {
            this.verificationEmailExpired = true;
          }
        });
        break;
      default:
        // TODO Error: invalid mode.
        console.log("invalid link");
    }
  }

  public signInAndResendVerificationEmail() {
    this.auth.afAuth.auth.signInWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
      .then((user) => {
        user.sendEmailVerification().then(() => {
          this.router.navigate(['dash'])
        })
      })
      .catch((err: AuthError) => this.auth.error.emit(err))
  }
}
