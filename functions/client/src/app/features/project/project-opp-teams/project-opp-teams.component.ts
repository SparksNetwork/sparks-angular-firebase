import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";

@Component({
    selector: 'project-opp-teams',
    templateUrl: 'project-opp-teams.component.html'
})

export class ProjectOppTeamsComponent implements OnChanges {
    @Input() teams: Array<Team>;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.teams)
            console.log(this.teams);
    }
}