import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'dash-dash',
  templateUrl: 'dash.component.html'
})

export class DashComponent implements OnInit {
  constructor(
    public afa: AngularFireAuth,
  ) { }

  ngOnInit() { }
}
