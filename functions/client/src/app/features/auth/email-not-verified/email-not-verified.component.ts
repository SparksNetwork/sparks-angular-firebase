import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/catch';

import { AuthService, User } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html'
})
export class EmailNotVerifiedComponent {

  notificationMessage: string;

  constructor(private auth: AuthService) { }

  sendValidationEmail($event) {
    $event.preventDefault();

    this.notificationMessage = null;
    
    this.auth.current.subscribe((user: User) => {
      user.sendEmailVerification()
        .then(() => this.notificationMessage = "An email was sent please check your email.")
        .catch(() => this.notificationMessage = "An error has occured please try again.")
    });
  }
}
