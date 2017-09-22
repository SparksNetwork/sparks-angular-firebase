import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ActionBarType } from '../action-bar/action-bar.component';
import { Project } from '../../../../../../universal/domain/project';

@Component({
  templateUrl: './page-message.component.html',
})
export class PageMessageComponent implements OnInit {
  public actionBarType = ActionBarType;
  public title: string
  public message: string
  public askType: ActionBarType;
  public project: Project;

  constructor(private route: ActivatedRoute) {
    this.askType = ActionBarType.Sparks
    if (this.route.snapshot.url.find(segment => segment.path.indexOf('application-pending') > -1)) {
      this.askType = ActionBarType.Organizer
      this.title = 'Application Pending';
      this.message = 'Your application must be accepted before you can continue. We will let you know when your application will be confirmed.';
      return;
    }
  }

  ngOnInit() {
    this.route.snapshot.data['project'].subscribe(data => {
      this.project = data;
    });
  }

}