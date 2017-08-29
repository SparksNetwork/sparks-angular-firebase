import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";
import { ApplicationTeamActionService } from "../../../core/sndomain/applicationTeam/application-team-action.service";
import { SelectedTeam } from "./selected-team";

@Component({
    selector: 'apply-opp-teams-selected',
    templateUrl: 'opp-teams-selected.component.html'
})

export class OppTeamsSelectedComponent implements OnChanges {
    @Input() private allTeams: any;
    @Input() editable: boolean = true;
    teams: SelectedTeam[] = new Array<SelectedTeam>();
    @Output() selectedCount: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        public applicationTeamAction: ApplicationTeamActionService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.allTeams) {
            this.teams = new Array<SelectedTeam>();
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
            this.selectedCount.emit(this.teams.length);
        }
    }

    delete(key: string) {
        this.applicationTeamAction.delete(key).subscribe();
    }

    deleteAll() {
        this.teams.forEach(s => {
            this.applicationTeamAction.delete(s.appTeamKey).subscribe();
        });
    }

}