import { Component, OnInit } from '@angular/core';
import { ApplicationActionService } from '../../../core/sndomain/application';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, ApplicationStatus, ApplicationStepFinished } from '../../../../../../universal/domain/application';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Opp } from '../../../../../../universal/domain/opp';

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {
  public applicationKey: string;
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
    this.answerForm = builder.group({
      answer: ['', [Validators.required]]
    });

    this.editFromReviewPage = !!this.route.snapshot.url.find(segment => segment.path.indexOf('edit-answer') > -1);
  }

  ngOnInit() {
    this.applicationKey = this.route.parent.snapshot.paramMap.get('applicationKey');

    this.route.snapshot.data['application'].subscribe(app => {
      console.log(app)
      this.applicationKey = app.$key;
      this.answerForm.get('answer').setValue(app.oppAnswer);
      this.edit = true;
    });

    this.route.parent.snapshot.data['opp'].subscribe(opp => {
      this.opp = opp;
    });
  };

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
