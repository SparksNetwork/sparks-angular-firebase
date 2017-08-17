import { Component, Input } from '@angular/core';
import { Team } from "../../../../../../universal/domain/team";

@Component({
    selector: 'opp-teams-not-selected',
    templateUrl: 'opp-teams-not-selected.component.html'
})

export class OppTeamsNotSelectedComponent {
    @Input() teams: Team[];

    constructor() { }
}