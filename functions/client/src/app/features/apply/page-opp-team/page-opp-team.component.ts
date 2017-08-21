import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Team } from "../../../../../../universal/domain/team";
import { Observable } from "rxjs/Rx";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { ApplicationTeamActionService } from "../../../core/sndomain/applicationTeam/application-team-action.service";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";

@Component({
    templateUrl: 'page-opp-team.component.html'
})

export class PageOppTeamComponent implements OnInit {
    public team: Observable<Team>;
    public actionBarType = ActionBarType;
    public answer: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public applicationTeamAction: ApplicationTeamActionService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.team = data['team'];
        })
    }

    join(key: string) {
        console.log(this.answer);
        let appTeam = new ApplicationTeam();
        appTeam.appKey = "AP1";
        appTeam.teamKey = key;
        this.applicationTeamAction.create(appTeam)
            .subscribe((s) => { this.router.navigate(['../'], { relativeTo: this.route }) });
    }
}