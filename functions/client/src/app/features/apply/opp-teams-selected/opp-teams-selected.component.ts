import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";
import { OppTeamsSelectService } from "../opp-teams-select.service";

@Component({
    selector: 'opp-teams-selected',
    templateUrl: 'opp-teams-selected.component.html'
})

export class OppTeamsSelectedComponent implements OnChanges {
    @Input() private allTeams: Team[];
    teams: Team[];

    constructor(
        private oppTeamsSelectService: OppTeamsSelectService
    ) { }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (this.allTeams) {
            let selectedKeys = this.oppTeamsSelectService.getTeamKeys();
            this.teams = this.allTeams.filter(t => selectedKeys.indexOf(t.$key) > -1);
        }
    }
}