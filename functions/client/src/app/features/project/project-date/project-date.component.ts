import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-project-date',
  templateUrl: './project-date.component.html'
})
export class ProjectDateComponent implements OnInit {

  @Input() startDateTime:string;
  @Input() endDateTime:string;

  readonly dateFormat = 'MMM d';

  constructor() { }

  ngOnInit() {
  }

}
