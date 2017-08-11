import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Team } from "../../../../../../universal/domain/team";
import { Observable } from "rxjs/Rx";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

@Component({
    templateUrl: 'page-opp-team.component.html'
})

export class PageOppTeamComponent implements OnInit {
    public team: Observable<Team>;
    public actionBarType = ActionBarType;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() { 
         this.route.data.subscribe(data => {
            this.team = data['team'];
        })
    }
}