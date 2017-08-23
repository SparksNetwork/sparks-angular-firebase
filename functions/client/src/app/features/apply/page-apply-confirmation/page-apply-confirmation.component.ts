import { Component, OnInit } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

@Component({
    templateUrl: 'page-apply-confirmation.component.html'
})

export class PageApplyConfirmationComponent implements OnInit {
    public actionBarType = ActionBarType;
    constructor() { }

    ngOnInit() { }
}