import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";

@Component({
    selector: 'apply-opp-teams-not-selected',
    templateUrl: 'opp-teams-not-selected.component.html'
})

export class OppTeamsNotSelectedComponent implements OnChanges {
    @Input() private allTeams: any;
    teams: Team[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.allTeams) {
            let all = <Array<Team>>this.allTeams[0];
            let appTeams = <Array<ApplicationTeam>>this.allTeams[1];
            if (appTeams) {
                let appTeamKeys = appTeams.map(s => s.teamKey);
                this.teams = all.filter(t => appTeamKeys.indexOf(t.$key) === -1);
            }
            else
                this.teams = all;
        }
    }
}