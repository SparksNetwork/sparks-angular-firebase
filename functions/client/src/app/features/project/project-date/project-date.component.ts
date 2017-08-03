import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-project-date',
  templateUrl: './project-date.component.html'
})
export class ProjectDateComponent implements OnInit {

  @Input() startDateTime:string;
  @Input() endDateTime:string;
  @Input() title: string
  @Input() location: string
  @Input() description: string

  readonly dateFormat = 'MMM d';

  constructor() { }

  ngOnInit() {
  }

}
