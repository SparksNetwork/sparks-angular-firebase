import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Team } from "../../../../../../universal/domain/team";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { OppTeamsSelectService } from "../opp-teams-select.service";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";


@Component({
    templateUrl: 'page-opp-teams.component.html'
})

export class PageOppTeamsComponent implements OnInit {
    public teams: Observable<Team[]>;
    public applicationTeams: Observable<ApplicationTeam[]>;
    public actionBarType = ActionBarType;
    public notSelectedTeams: any;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.teams = data['teams'];
            this.applicationTeams = data['appTeams'];
            this.notSelectedTeams = Observable.combineLatest(
                this.teams,
                this.applicationTeams
            ).map(([all, applied]) => {
                let teamKeys = applied.map(s => s.teamKey);
                if(teamKeys)
                    return all.filter(a => teamKeys.indexOf(a.$key) === -1)
                return all;
            })
        });
    }
}