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
  private profileKey: string;
  private newApplication: boolean;

  constructor(
    public applicationAction: ApplicationActionService,
    public route: ActivatedRoute,
    public router: Router
  ) { 
    this.route.parent.snapshot.data["profile"].subscribe(profile => {
      this.profileKey = profile.$key;
    })
  }

  ngOnInit() {
    this.oppKey = this.route.parent.snapshot.params["oppKey"];
    this.applicationKey = this.route.parent.snapshot.params["applicationKey"];

    if (!this.applicationKey) {
      this.newApplication = true;

      let application = new Application();
      application.profileKey = this.profileKey;
      application.oppQuestion = "Opp Question"; //should be implemented in another branch
      application.oppAnswer = "Opp Answer";
      application.oppKey = this.oppKey;
      application.status = ApplicationStatus.Incomplete;
      this.applicationAction.create(application)
        .subscribe(s => {
          this.applicationKey = s.json();
        })
      }
  }

  navigate() {
    if (this.newApplication) {
      this.router.navigate(['/apply', this.oppKey, 'application', this.applicationKey, 'teams',], { relativeTo: this.route });
    } else {
      this.router.navigate(['/apply', this.oppKey, 'application', this.applicationKey, 'review-detail',], { relativeTo: this.route });
    }
    
  }

}
