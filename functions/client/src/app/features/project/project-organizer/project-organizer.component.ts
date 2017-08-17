import { Component, OnInit, Input } from '@angular/core';
import { Organizer } from "../../../../../../universal/domain/organizer";

@Component({
  selector: 'project-project-organizer',
  templateUrl: './project-organizer.component.html'
})
export class ProjectOrganizerComponent implements OnInit {

  @Input() organizer: Organizer;

  constructor() { }

  ngOnInit() {
  }

}
