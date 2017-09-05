import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../../../universal/domain/project';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';

@Component({
  templateUrl: './page-shift.component.html',
})
export class PageShiftComponent implements OnInit {

  public actionBarType = ActionBarType;
  public project: Project;

  constructor(private route: ActivatedRoute) {
    this.route.snapshot.data['project'].subscribe(project => this.project = project)
  }

  ngOnInit() {
  }

}
