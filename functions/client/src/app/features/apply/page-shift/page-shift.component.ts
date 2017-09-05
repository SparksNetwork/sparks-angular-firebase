import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../../../../../universal/domain/project";

@Component({
  templateUrl: './page-shift.component.html',
})
export class PageShiftComponent implements OnInit {

  public project: Project;

  constructor(private route: ActivatedRoute) {
    this.route.snapshot.data["project"].subscribe(project => this.project = project)
    this.route.snapshot.data['applicationShift'].subscribe(console.log.bind(this, 'app-shifts:'))
  }

  ngOnInit() {
  }

}
