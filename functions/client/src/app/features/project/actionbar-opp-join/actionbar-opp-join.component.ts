import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";

@Component({
  selector: 'project-actionbar-opp-join',
  templateUrl: 'actionbar-opp-join.component.html'
})

export class ActionbarOppJoinComponent implements OnChanges {
  @Input() opp
  @Input() private applications: Application[];
  public application: Application;
  actionBarType = ActionBarType

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.applications) {
      let applications = this.applications.filter(s => s.status !== ApplicationStatus.Canceled);
      if(applications)
        this.application = applications[0];
    }
  }

}