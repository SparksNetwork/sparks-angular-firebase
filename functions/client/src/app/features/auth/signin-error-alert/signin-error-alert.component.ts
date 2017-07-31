import { Component, OnInit, Input } from '@angular/core'
import { FirebaseError } from 'firebase/app'

@Component({
  selector: 'auth-signin-error-alert',
  templateUrl: 'signin-error-alert.component.html'
})

export class SigninErrorAlertComponent implements OnInit {
  @Input() public error: FirebaseError

  constructor() {}

  mapMessage(error: FirebaseError) {
    return error.message // translate code to human terms here
  }
}
