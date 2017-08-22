import { Component, OnInit } from '@angular/core';
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";
import { ActivatedRoute } from "@angular/router";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";
import { Observable } from "rxjs/Rx";
import { Team } from "../../../../../../universal/domain/team";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { ApplicationActionService } from "../../../core/sndomain/application";

@Component({
    templateUrl: 'page-review-detail.component.html'
})

export class PageReviewDetailComponent implements OnInit {
    public application: Application;
    private teams: Observable<Team[]>;
    private applicationTeams: Observable<ApplicationTeam[]>;
    public allTeams: any;
    public actionBarType = ActionBarType;

    constructor(
        public route: ActivatedRoute,
        public applicationAction: ApplicationActionService, ) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            data['application'].subscribe(a => this.application = <Application>a);
            this.teams = data['teams'];
            this.applicationTeams = data['appTeams'];
            this.allTeams = Observable.combineLatest(
                this.teams,
                this.applicationTeams
            )
        });
    }

    apply() {
        this.application.status = ApplicationStatus.Pending;
        let key = this.application.$key;
        let value = this.applicationAction.formatToDb(this.application);
        this.applicationAction.replace(key, value).subscribe(
            s => console.log(s)
        )
    }
}