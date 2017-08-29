import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";
import { ApplicationActionService } from "../../../core/sndomain/application";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'project-actionbar-opp-join',
  templateUrl: 'actionbar-opp-join.component.html'
})

export class ActionbarOppJoinComponent implements OnChanges {
  @Input() opp: Opp;
  @Input() private applications: Application[];
  public application: Application;
  actionBarType = ActionBarType

  constructor(
    public applicationAction: ApplicationActionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.applications) {
      let applications = this.applications.filter(s => s.status !== ApplicationStatus.Canceled && s.oppKey === this.opp.$key);
      if (applications)
        this.application = applications[0];
    }
  }

  cancel(application: Application) {
    this.applicationAction
      .changeStatus(application.$key, ApplicationStatus.Canceled)
      .subscribe();
  }

}