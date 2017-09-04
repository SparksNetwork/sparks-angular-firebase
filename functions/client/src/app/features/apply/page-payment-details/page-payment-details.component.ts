import { Component, OnInit } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

@Component({
  templateUrl: './page-payment-details.component.html'
})
export class PagePaymentDetailsComponent implements OnInit {

  public actionBarType = ActionBarType;
  
  constructor() { }

  ngOnInit() {
  }

}
