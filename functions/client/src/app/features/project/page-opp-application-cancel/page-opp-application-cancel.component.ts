import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Opp } from "../../../../../../universal/domain/opp";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: 'page-opp-application-cancel.component.html'
})

export class PageOppApplicationCancelComponent implements OnInit {
    public opp: Observable<Opp>;

    constructor(public route: ActivatedRoute) 
    { }

    ngOnInit() { 
        this.route.parent.data.subscribe(data => {
            this.opp = data['opp'];
            this.opp.subscribe(
                s=> console.log(s)
            )
          })
    }
}