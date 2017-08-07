import { Component, OnInit, Input } from '@angular/core';
import { Location } from "../../../../../../shared/domain/location";

@Component({
  selector: 'project-project-location',
  templateUrl: './project-location.component.html'
})
export class ProjectLocationComponent implements OnInit {

  @Input() location: Location;

  constructor() { }

  ngOnInit() {
  }

}
