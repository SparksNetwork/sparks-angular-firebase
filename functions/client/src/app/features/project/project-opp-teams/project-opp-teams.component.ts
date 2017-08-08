import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";

@Component({
    selector: 'project-opp-teams',
    templateUrl: 'project-opp-teams.component.html'
})

export class ProjectOppTeamsComponent implements OnChanges {
    @Input() private teams: Array<Team>;
    private displayedTeams: Array<Team>;
    private collapsedTeams: Array<Team>;
    private collapsedTeamNames: string;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.teams) {
            let limit = Math.min(this.teams.length, 3);
            this.displayedTeams = this.teams.slice(0, limit);
            this.collapsedTeams = this.teams.slice(limit, this.teams.length);
            this.collapsedTeamNames = this.collapsedTeams.map((team) => team.title).join(', ');
        }
    }
}