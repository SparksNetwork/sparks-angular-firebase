import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-project-description',
  templateUrl: './project-description.component.html'
})
export class ProjectDescriptionComponent implements OnInit {

  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
