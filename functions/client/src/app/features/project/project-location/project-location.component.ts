import { Component, OnInit, Input } from '@angular/core';
import { ILocation } from "../../../../../../shared/interfaces/location.model";

@Component({
  selector: 'project-project-location',
  templateUrl: './project-location.component.html'
})
export class ProjectLocationComponent implements OnInit {

  @Input() location: ILocation;

  constructor() { }

  ngOnInit() {
  }

}
