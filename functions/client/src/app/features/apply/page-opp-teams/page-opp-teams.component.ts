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
    private _teams: Observable<Team[]>;
    public actionBarType = ActionBarType;
    public selectedTeams: Team[];
    public notSelectedTeams: Team[];

    constructor(
        public route: ActivatedRoute,
        private oppTeamsSelectService: OppTeamsSelectService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this._teams = data['teams'];
            let selectedKeys = this.oppTeamsSelectService.getTeamKeys();
            if (this._teams) {
                this._teams.subscribe(
                    (teams: Team[]) => {
                        this.selectedTeams = teams.filter(t => selectedKeys.indexOf(t.$key) > -1);
                        this.notSelectedTeams = teams.filter(t => selectedKeys.indexOf(t.$key) === -1)
                    }
                )
            }
        })
    }
}