import { Component, OnInit } from '@angular/core';
import { ApplicationActionService } from "../../../core/sndomain/application";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "../../../../../../universal/domain/application";

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {
  private oppKey: string;

  constructor(
    public applicationAction: ApplicationActionService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.oppKey = this.route.snapshot.params["oppKey"];
  }

  navigateToTeams() {
    let application = new Application();
    application.profileKey = "PnDuT5wx8wThD3L1lgOTjubs0C03";
    application.oppQuestion = "Opp Question";
    application.oppAnswer = "Opp Answer";
    application.oppKey = this.oppKey;
    this.applicationAction.create(application)
      .subscribe(s => {
        this.router.navigate(['..', 'application', s.json(), 'teams',], { relativeTo: this.route });
      })
  }

}
