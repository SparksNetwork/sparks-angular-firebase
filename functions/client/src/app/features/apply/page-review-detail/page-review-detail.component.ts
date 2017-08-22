import { Component, OnInit } from '@angular/core';
import { Application } from "../../../../../../universal/domain/application";
import { ActivatedRoute } from "@angular/router";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";
import { Observable } from "rxjs/Rx";
import { Team } from "../../../../../../universal/domain/team";

@Component({
    templateUrl: 'page-review-detail.component.html'
})

export class PageReviewDetailComponent implements OnInit {
    public application: Application;
    private teams: Observable<Team[]>;
    private applicationTeams: Observable<ApplicationTeam[]>;
    public allTeams: any;
    
    constructor(public route: ActivatedRoute) { 
    }

    ngOnInit() { 
        this.route.data.subscribe(data => {
            data['application'].subscribe(a => this.application = a);
            this.teams = data['teams'];
            this.applicationTeams = data['appTeams'];
            this.allTeams = Observable.combineLatest(
                this.teams,
                this.applicationTeams
            )
        });
    }
}