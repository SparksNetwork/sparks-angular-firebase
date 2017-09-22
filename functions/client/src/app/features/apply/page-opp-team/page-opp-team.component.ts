import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../../../../../universal/domain/team';
import { Observable } from 'rxjs/Observable';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { ApplicationTeamActionService } from '../../../core/sndomain/applicationTeam/application-team-action.service';
import { ApplicationTeam } from '../../../../../../universal/domain/applicationTeam';
import { Application } from '../../../../../../universal/domain/application';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: 'page-opp-team.component.html'
})

export class PageOppTeamComponent implements OnInit {
    public team: Observable<Team>;
    private application: Application;
    public actionBarType = ActionBarType;
    public answerForm: FormGroup;
    private isDisabled: boolean;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public applicationTeamAction: ApplicationTeamActionService,
        public builder: FormBuilder
    ) {
        this.answerForm = builder.group({
            answer: ['', [Validators.required]]
        })
        this.isDisabled = false;
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.team = data['team'];
        })
        this.route.parent.data.subscribe(data => {
            data['application'].subscribe(a => {
                this.application = a;
            })
        })
    }

    join(key: string, question: string) {
        this.isDisabled = true;
      
        const appTeam = new ApplicationTeam();
        appTeam.appKey = this.application.$key;
        appTeam.teamKey = key;
        appTeam.answer = this.answerForm.get('answer').value;
        appTeam.question = question;
        appTeam.joinedOn = new Date().toISOString();
        this.applicationTeamAction.create(appTeam)
            .subscribe((s) => { this.router.navigate(['../'], { relativeTo: this.route }) });
    }
}
