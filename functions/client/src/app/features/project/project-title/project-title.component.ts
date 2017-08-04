import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-project-title',
  templateUrl: './project-title.component.html'
})
export class ProjectTitleComponent implements OnInit {

  @Input() title: string;
  @Input() maxKarmaPoints: number;

  constructor() { }

  ngOnInit() {
  }

}
