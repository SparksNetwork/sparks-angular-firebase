import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { sharedMoment } from '../../../universal/sharedMoment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  title = sharedMoment().toString();
  isAuth: boolean;

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        this.isAuth = event.url.startsWith('/auth');
      });

  }
}
