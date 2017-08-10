import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Team } from "../../../../../../universal/domain/team";
import { Observable } from "rxjs/Rx";

@Component({
    templateUrl: 'page-opp-team.component.html'
})

export class PageOppTeamComponent implements OnInit {
    public team: Observable<Team>;

    constructor(
        public route: ActivatedRoute
    ) { }

    ngOnInit() { 
         this.route.data.subscribe(data => {
            this.team = data['team'];
            this.team.subscribe((t)=>{console.log(t)})
        })
    }
}