import { Component, Input } from '@angular/core'

import { Opp } from "../../../../../../universal/domain/opp";
import { ApplicationStatus } from "../../../../../../universal/domain/application";

@Component({
  selector: 'project-opp-card',
  templateUrl: 'project-opp-card.component.html'
})

export class ProjectOppCardComponent {
  @Input() opp: Opp
  @Input() applicationStatus: ApplicationStatus

  constructor() { }
}
