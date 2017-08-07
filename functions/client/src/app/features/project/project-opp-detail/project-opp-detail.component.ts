import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';
import { Project } from "../../../../../../universal/domain/project";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
    selector: 'project-opp-detail',
    templateUrl: 'project-opp-detail.component.html'
})

export class ProjectOppDetailComponent implements OnInit {
    public project: Observable<Project>;
    public opp: Observable<Opp>;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.project = data['project'];
            this.project.subscribe((s) => { console.log(s) });
            this.opp = data['opp'];
            this.opp.subscribe((s) => { console.log(s) });
        });
    }
}