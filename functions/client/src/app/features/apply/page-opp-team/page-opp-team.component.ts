import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Team } from "../../../../../../universal/domain/team";
import { Observable } from "rxjs/Rx";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { ApplicationTeamActionService } from "../../../core/sndomain/applicationTeam/application-team-action.service";
import { ApplicationTeam } from "../../../../../../universal/domain/applicationTeam";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: 'page-opp-team.component.html'
})

export class PageOppTeamComponent implements OnInit {
    public team: Observable<Team>;
    public actionBarType = ActionBarType;
    public answer: string;
    public answerForm: FormGroup;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public applicationTeamAction: ApplicationTeamActionService,
        public builder: FormBuilder
    ) {
        this.answerForm = builder.group({
            answer: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.team = data['team'];
        })
    }

    join(key: string) {
        console.log(this.answerForm.get("answer").value);
        let appTeam = new ApplicationTeam();
        appTeam.appKey = "AP1";
        appTeam.teamKey = key;
        this.applicationTeamAction.create(appTeam)
            .subscribe((s) => { this.router.navigate(['../'], { relativeTo: this.route }) });
    }
}