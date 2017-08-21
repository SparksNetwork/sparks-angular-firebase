import { Component, OnInit } from '@angular/core';
import { ApplicationActionService, ApplicationDataService } from "../../../core/sndomain/application";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "../../../../../../universal/domain/application";

@Component({
  selector: 'apply-page-answer-question',
  templateUrl: './page-answer-question.component.html',
})
export class PageAnswerQuestionComponent implements OnInit {

  constructor(
    public applicationAction: ApplicationActionService,
    public applicationDataService: ApplicationDataService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {

  }

  navigateToTeams() {
    let application = new Application();
    application.profileKey = "PnDuT5wx8wThD3L1lgOTjubs0C03";
    application.oppKey = "LC2";
    this.applicationAction.create(application)
      .subscribe(s => {
        this.applicationDataService.$key = s.json();
        this.router.navigate(['..', 'teams'], { relativeTo: this.route });
      })
  }

}
