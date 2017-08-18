import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";
import { ApplicationTeamActionService } from "../../../core/sndomain/applicationTeam/application-team-action.service";
import { SelectedTeam } from "./selected-team";

@Component({
    selector: 'opp-teams-selected',
    templateUrl: 'opp-teams-selected.component.html'
})

export class OppTeamsSelectedComponent implements OnChanges {
    @Input() private allTeams: any;
    teams: SelectedTeam[] = new Array<SelectedTeam>();

    constructor(
        public applicationTeamAction: ApplicationTeamActionService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.allTeams) {
            let all = <Array<Team>>this.allTeams[0];
            let appTeams = <Array<ApplicationTeam>>this.allTeams[1];
            if (appTeams) {
                for (var i = 0; i < appTeams.length; i++) {
                    let team = all.find(s => s.$key === appTeams[i].teamKey);
                    if (team) {
                        let selectedTeam = new SelectedTeam();
                        selectedTeam = team;
                        selectedTeam.appTeamKey = appTeams[i].$key;
                        this.teams.push(selectedTeam)
                    }
                }
            }
        }
    }
}