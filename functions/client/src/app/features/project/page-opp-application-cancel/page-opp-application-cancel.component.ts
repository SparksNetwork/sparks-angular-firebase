import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Opp } from "../../../../../../universal/domain/opp";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../../../../../universal/domain/project";
import { Benefit } from "../../../../../../universal/domain/benefit";

@Component({
    templateUrl: 'page-opp-application-cancel.component.html'
})

export class PageOppApplicationCancelComponent implements OnInit {
    public opp: Observable<Opp>;
    public project: Observable<Project>
    public benefits: Observable<Benefit[]>;

    constructor(public route: ActivatedRoute) 
    { }

    ngOnInit() { 
        this.route.parent.data.subscribe(data => {
            this.opp = data['opp'];
            this.project = data['project'];
            this.benefits = data['benefits'];
          })
    }
}