import { Component, OnInit } from '@angular/core';
import { ApplicationActionService } from "../../../core/sndomain/application";
import { ActivatedRoute, Router } from "@angular/router";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {
  public opp: Opp;
  public applicationKey: string;
  public answerForm: FormGroup;
  private edit: boolean = false;

  constructor(
    public applicationAction: ApplicationActionService,
    public route: ActivatedRoute,
    public router: Router,
    public builder: FormBuilder
  ) {
    this.answerForm = builder.group({
      answer: ['', [Validators.required]]
    })
  }

  ngOnInit() {
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
            this.answerForm.get("answer").setValue(a.oppAnswer);
            this.edit = true;
          }
        )
      }
    })
  }

  private onLoadedOpp(opp: Opp) {
    this.opp = opp;
    let application = new Application();
    application.profileKey = "PnDuT5wx8wThD3L1lgOTjubs0C03"; //I will use a new service from develop
    application.oppKey = this.opp.$key;
    application.status = ApplicationStatus.Incomplete;
    application.projectKey = this.opp.projectKey;
    application.projectProfileKey =  this.applicationAction.query.generateProjectProfileKey(application.projectKey, application.profileKey)
    this.applicationAction.create(application)
      .subscribe(s => {
        this.applicationKey = s.json();
      })
  }

  submit() {
    let answer = this.answerForm.get("answer").value;
    let value = {
      oppQuestion: this.opp.question,
      oppAnswer: answer
    }
    this.applicationAction.update(this.applicationKey, value).subscribe(
      s => {
        if (this.edit)
          this.router.navigate(['../', 'teams'], { relativeTo: this.route })
        else
          this.router.navigate(['..', 'application', this.applicationKey, 'teams'], { relativeTo: this.route })
      }
    )
  }

}
