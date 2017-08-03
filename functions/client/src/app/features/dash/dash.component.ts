import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/snauth/auth/auth.service'

@Component({
  selector: 'dash-dash',
  templateUrl: 'dash.component.html'
})

export class DashComponent {
  constructor(
    public auth: AuthService,
  ) { }
}
