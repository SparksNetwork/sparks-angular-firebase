import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';
import { Project } from "../../../../../../universal/domain/project";
import { Opp } from "../../../../../../universal/domain/opp";
import { Team } from "../../../../../../universal/domain/team";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Benefit } from "../../../../../../universal/domain/benefit";
import { Contrib } from "../../../../../../universal/domain/contrib";

@Component({
    selector: 'project-opp-detail',
    templateUrl: 'project-opp-detail.component.html'
})

export class ProjectOppDetailComponent implements OnInit {
    public project: Observable<Project>;
    public opp: Observable<Opp>;
    public teams: Observable<Team[]>;
    public benefits: Benefit[];
    public contribs: Contrib[];
    public actionBarType = ActionBarType;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.project = data['project'];
            this.opp = data['opp'];
            this.teams = data['teams'];
            data['benefits'].subscribe((b) => this.benefits = b);
            data['contribs'].subscribe((c)=> this.contribs = c);
        });
    }
}