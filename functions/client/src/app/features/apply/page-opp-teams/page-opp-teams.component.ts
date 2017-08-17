import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Team } from "../../../../../../universal/domain/team";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { OppTeamsSelectService } from "../opp-teams-select.service";


@Component({
    templateUrl: 'page-opp-teams.component.html'
})

export class PageOppTeamsComponent implements OnInit {
    public teams: Observable<Team[]>;
    public applicationTeams: Observable<Team[]>;
    public actionBarType = ActionBarType;
    public notSelectedTeams: any;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.teams = data['teams'];
            this.applicationTeams = data['teams'];
            this.notSelectedTeams = Observable.combineLatest(
                this.teams,
                this.applicationTeams
            ).map(([all, applied]) => all)             
        });
    }
}