import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Application, ApplicationStatus, ApplicationStepFinished } from "../../../../../../universal/domain/application";
import { ApplicationActionService } from "../../../core/sndomain/application";
import { Opp } from "../../../../../../universal/domain/opp";
import { Router } from "@angular/router";

@Component({
  selector: 'project-actionbar-opp-join',
  templateUrl: 'actionbar-opp-join.component.html'
})

export class ActionbarOppJoinComponent implements OnChanges {
  @Input() opp: Opp;
  @Input() private applications: Application[];
  public application: Application;
  showCancelButton: boolean = false;

  constructor(
    public applicationAction: ApplicationActionService,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.applications) {
      this.application = this.applications
        .find(s =>
          s.status !== ApplicationStatus.Canceled &&
          s.oppKey === this.opp.$key);
      if (this.application) {
        switch (this.application.status) {
          case ApplicationStatus.Accepted:
          case ApplicationStatus.Pending:
            this.showCancelButton = true;
            break;
          case ApplicationStatus.Incomplete:
            this.showCancelButton = false;
            break;
        }
      }
    }
  }

  cancel(application: Application) {
    this.applicationAction
      .changeStatus(application.$key, ApplicationStatus.Canceled)
      .subscribe();
  }

  continue(application: Application) {
    if (!application.step)
      this.router.navigate(['/apply', application.oppKey, 'application', application.$key, 'answer-question'])
    if (application.step === ApplicationStepFinished.Answer)
      this.router.navigate(['/apply', application.oppKey, 'application', application.$key, 'teams'])
    if (application.step === ApplicationStepFinished.Team)
      this.router.navigate(['/apply', application.oppKey, 'application', application.$key, 'review-detail'])
  }

}