import { Component, OnInit } from '@angular/core';
import { Application, ApplicationStatus } from '../../../../../../universal/domain/application';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationTeam } from '../../../../../../universal/domain/applicationTeam';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../../../../../universal/domain/team';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { ApplicationActionService } from '../../../core/sndomain/application';
import { Profile } from '../../../../../../universal/domain/profile';
import { Project } from '../../../../../../universal/domain/project';

@Component({
    templateUrl: 'page-review-detail.component.html'
})

export class PageReviewDetailComponent implements OnInit {
    public application: Application;
    private teams: Observable<Team[]>;
    private applicationTeams: Observable<ApplicationTeam[]>;
    private profile: Observable<Profile>;
    public allTeams: any;
    public actionBarType = ActionBarType;
    public project: Project;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public applicationAction: ApplicationActionService) {
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

        this.profile = this.route.parent.snapshot.data['profile'];

        this.route.snapshot.data['project'].subscribe(data => {
            this.project = data;
        });
    }

    apply() {
        this.applicationAction.changeStatus(this.application.$key, ApplicationStatus.Pending).subscribe(s =>
            // TODO send email
            this.router.navigate(['../apply-cofirmation'], { relativeTo: this.route })
        )
    }
}
