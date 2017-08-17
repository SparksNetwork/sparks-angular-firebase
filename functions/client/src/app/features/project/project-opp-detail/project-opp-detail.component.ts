import { Component, OnInit, Input } from '@angular/core';
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
    @Input() public project: Project;
    @Input() public opp: Opp;
    @Input() public teams: Team[];
    @Input() public benefits: Benefit[];
    @Input() public contribs: Contrib[];
    public actionBarType = ActionBarType;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
    }
}