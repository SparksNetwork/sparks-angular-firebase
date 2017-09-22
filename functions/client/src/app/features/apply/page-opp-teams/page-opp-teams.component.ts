import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../../../../../universal/domain/team';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { ApplicationTeam } from '../../../../../../universal/domain/applicationTeam';
import { ApplicationActionService } from '../../../core/sndomain/application/application-action.service';
import { ApplicationStepFinished, Application } from '../../../../../../universal/domain/application';


@Component({
    templateUrl: 'page-opp-teams.component.html'
})

export class PageOppTeamsComponent implements OnInit {
    private teams: Observable<Team[]>;
    private applicationTeams: Observable<ApplicationTeam[]>;
    public actionBarType = ActionBarType;
    public allTeams: any;
    public selectedCount: number;
    private application: Application;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public applicationAction: ApplicationActionService
    ) { }

    ngOnInit() {
        this.route.parent.data.subscribe(data => {
            this.teams = data['teams'];
            this.applicationTeams = data['appTeams'];
            this.allTeams = Observable.combineLatest(
                this.teams,
                this.applicationTeams
            )
        });

        this.route.parent.snapshot.data['application'].subscribe(data => {
            this.application = data;
        });
    }

    next() {
        this.applicationAction.updateApplicationStepFinished(this.application.$key, ApplicationStepFinished.Team)
            .subscribe(
                s => this.router.navigate(['../review-detail'], { relativeTo: this.route.parent })
            )
    }

    previous() {
        this.router.navigate(['../answer-question'], { relativeTo: this.route.parent })
    }

    onSelectedCount(count: number) {
        this.selectedCount = count;
    }
}
