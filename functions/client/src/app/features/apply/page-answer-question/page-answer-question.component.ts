import { Component, OnInit } from '@angular/core';
import { ApplicationActionService } from "../../../core/sndomain/application";
import { ActivatedRoute, Router } from "@angular/router";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {
  private oppKey: string;
  private applicationKey: string;

  constructor(
    public applicationAction: ApplicationActionService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.oppKey = this.route.snapshot.params["oppKey"];
    let application = new Application();
    application.profileKey = "PnDuT5wx8wThD3L1lgOTjubs0C03"; //I will use a new service from develop
    application.oppQuestion = "Opp Question";
    application.oppAnswer = "Opp Answer";
    application.oppKey = this.oppKey;
    application.status = ApplicationStatus.Incomplete;
    this.applicationAction.create(application)
      .subscribe(s => {
        this.applicationKey = s.json();
      })
  }

  navigateToTeams() {
    this.router.navigate(['..', 'application', this.applicationKey, 'teams',], { relativeTo: this.route });
  }

}
