import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'auth-page-email-action-handler',
  templateUrl: './page-email-action-handler.component.html'
})
export class PageEmailActionHandlerComponent implements OnInit {
  public mode: string
  public oobCode: string
  public title: string
  public message: string

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
        }).catch((error) => {
          this.message = error.message;
        });
        break;
      default:
        // TODO Error: invalid mode.
        console.log("invalid link");
    }
  }
}
