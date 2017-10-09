import { Component, OnInit } from '@angular/core';
import { ApplicationActionService } from '../../../core/sndomain/application';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStatus, ApplicationStepFinished } from '../../../../../../universal/domain/application';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Opp } from '../../../../../../universal/domain/opp';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../../../../universal/domain/project';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {
  public opp: Opp;
  public applicationKey: string;
  public answerForm: FormGroup;
  public navigateTo: string;
  public project: Project;
  public actionBarType = ActionBarType;

  constructor(
    public applicationAction: ApplicationActionService,
    public route: ActivatedRoute,
    public router: Router,
    public builder: FormBuilder
  ) {
    this.answerForm = builder.group({
      answer: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.snapshot.data['application'].subscribe(app => {
      if (app) {
        this.applicationKey = app.$key;
        this.answerForm.get('answer').setValue(app.oppAnswer);
      }
    });

    this.route.parent.snapshot.data['opp'].subscribe(opp => {
      this.opp = opp;
    });

    this.route.data.subscribe(data => {
      console.log('navigateTo', data.navigateTo)
      this.navigateTo = data.navigateTo;
    });

    this.route.snapshot.data['project'].subscribe(data => {
      this.project = data;
     });
  };

  submit() {
    this.applicationAction.saveOppAnswer(this.applicationKey, this.opp.question, this.answerForm.get('answer').value)
      .subscribe(s => {
        console.log('redirecting')
        this.router.navigate(['..', this.navigateTo], { relativeTo: this.route });
      })
  }

}
