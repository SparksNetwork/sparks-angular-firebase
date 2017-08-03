import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-email-action-handler',
  templateUrl: './email-action-handler.component.html'
})
export class EmailActionHandlerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let mode = this.route.snapshot.queryParamMap.get('mode');
    let oobCode = this.route.snapshot.queryParamMap.get('oobCode');

    if (!mode || !oobCode) {
      // TODO remain on the same page or redirect to dash?
      console.log("invalid link");
      return this.router.navigate(['']);
    }

    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.        
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.        
        break;
      case 'verifyEmail':
        // Display email verification handler and UI.
        this.router.navigate(['auth/verify-email', oobCode])
        break;
      default:
        // TODO Error: invalid mode.
        console.log("invalid link");
    }
  }
}
