import { Component, OnInit } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Project } from '../../../../../../universal/domain/project';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './page-payment-details.component.html'
})
export class PagePaymentDetailsComponent implements OnInit {

  public actionBarType = ActionBarType;
  public project: Project;

  constructor(public route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.snapshot.data['project'].subscribe(data => {
      this.project = data;
    });

  }

}
