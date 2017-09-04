import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ActionBarType } from "../action-bar/action-bar.component";

@Component({
  templateUrl: './page-message.component.html',  
})
export class PageMessageComponent implements OnInit {
  public actionBarType = ActionBarType;
  public title: string
  public message: string

  constructor(private route: ActivatedRoute) {
    if (this.route.snapshot.url.find(segment => segment.path.indexOf('pending') > -1)) {
      this.title = 'Pending Application';
      this.message = 'Your application must be accepted before you can continue. We will let you know when your application will be confirmed.';
      return;
    }
  }

  ngOnInit() {
  }

}
