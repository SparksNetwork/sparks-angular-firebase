import { Component, OnInit } from '@angular/core';
import { ApplicationActionService } from "../../../core/sndomain/application";
import { ActivatedRoute, Router } from "@angular/router";
import { Application, ApplicationStatus, ApplicationStepFinished } from "../../../../../../universal/domain/application";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {
  public applicationKey: string;
  private profileKey: string;
  public opp: Opp;
  public answerForm: FormGroup;
  private edit: boolean = false;
  public editFromReviewPage: boolean;

  constructor(
    public applicationAction: ApplicationActionService,
    public route: ActivatedRoute,
    public router: Router,
    public builder: FormBuilder
  ) {
    this.route.parent.snapshot.data['profile'].subscribe(profile => {
      this.profileKey = profile.$key;
    });

    this.answerForm = builder.group({
      answer: ['', [Validators.required]]
    });

    this.editFromReviewPage = !!this.route.snapshot.url.find(segment => segment.path.indexOf('edit-answer') > -1);
  }

  ngOnInit() {
    this.applicationKey = this.route.parent.snapshot.paramMap.get('applicationKey');

    this.route.data.subscribe(data => {
      if (data['opp']) {
        data['opp'].subscribe(
          o => this.onLoadedOpp(o)
        )
      }
    });
    this.route.parent.data.subscribe(data => {
      if (data['opp']) {
        data['opp'].subscribe(
          o => this.opp = o
        )
      }
      if (data['application']) {
        data['application'].subscribe(
          a => {
            this.applicationKey = a.$key;
            this.answerForm.get('answer').setValue(a.oppAnswer);
            this.edit = true;
          }
        )
      }
    })

  }

  private onLoadedOpp(opp: Opp) {
    this.opp = opp;

    if (!this.applicationKey) {
      const application = new Application();
      application.profileKey = this.profileKey
      application.oppKey = this.opp.$key;
      application.status = ApplicationStatus.Incomplete;
      application.projectKey = this.opp.projectKey;
      application.projectProfileKey =  this.applicationAction.query.generateProjectProfileKey(application.projectKey, application.profileKey);
      application.createdOn = new Date().toISOString();

      this.applicationAction.create(application)
        .subscribe(s => {
          this.applicationKey = s.json();
          this.router.navigate(['apply', this.opp.$key, 'application', this.applicationKey, 'answer-question'])
        })
    }
  }

  submit() {
    const answer = this.answerForm.get('answer').value;
    const value = {
      oppQuestion: this.opp.question,
      oppAnswer: answer,
      step: ApplicationStepFinished.Answer
    }
    this.applicationAction.update(this.applicationKey, value).subscribe(
      s => {
        if (this.editFromReviewPage) {
          this.router.navigate(['../', 'review-detail'], { relativeTo: this.route })
          return;
        }

        if (this.edit) {
          this.router.navigate(['../', 'teams'], { relativeTo: this.route })
        } else {
          this.router.navigate(['..', 'application', this.applicationKey, 'teams'], { relativeTo: this.route })
        }
      }
    )
  }

}
