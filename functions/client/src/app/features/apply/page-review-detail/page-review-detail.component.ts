import { Component, OnInit } from '@angular/core';
import { Application } from "../../../../../../universal/domain/application";
import { ActivatedRoute } from "@angular/router";


@Component({
    templateUrl: 'page-review-detail.component.html'
})

export class PageReviewDetailComponent implements OnInit {
    public application: Application;

    constructor(public route: ActivatedRoute) { 
    }

    ngOnInit() { 
        this.route.data.subscribe(data => {
            data['application'].subscribe(a => this.application = a);
        });
    }
}