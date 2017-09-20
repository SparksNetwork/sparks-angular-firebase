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
  isDash: boolean;

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        window.scrollTo(0, 0);
        this.isAuth = event.url.indexOf('/signin') > -1 || event.url.indexOf('/signup') > -1 || event.url.indexOf('/email-signup') > -1 || event.url.indexOf('/reset-password') > -1 || event.url.indexOf('/email-action-handler') > -1 || event.url.indexOf('/email-not-verified') > -1;
        this.isDash = event.url.length == 1 && event.url.indexOf('/') > -1;
      });

  }
}
