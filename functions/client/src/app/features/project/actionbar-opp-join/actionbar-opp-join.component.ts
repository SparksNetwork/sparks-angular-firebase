import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";
import { Application } from "../../../../../../universal/domain/application";

@Component({
  selector: 'project-actionbar-opp-join',
  templateUrl: 'actionbar-opp-join.component.html'
})

export class ActionbarOppJoinComponent implements OnChanges {
  @Input() opp
  @Input() private applications: Application[];
  actionBarType = ActionBarType

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.applications) {
      console.log(this.applications)
    }
  }

}