import { Component, Input } from '@angular/core';
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

@Component({
  selector: 'project-actionbar-opp-join',
  templateUrl: 'actionbar-opp-join.component.html'
})

export class ActionbarOppJoinComponent {
  @Input() opp
  actionBarType = ActionBarType

  constructor() { }
}