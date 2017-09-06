import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { Project } from '../../../../../../universal/domain/project';
import { Shift } from '../../../../../../universal/domain/shift';

@Component({
  templateUrl: './page-shift.component.html',
})
export class PageShiftComponent implements OnInit {

  public actionBarType = ActionBarType;
  public project: FirebaseObjectObservable<Project>;
  public shifts: FirebaseListObservable<Shift>;

  constructor(private route: ActivatedRoute) {
    this.project = this.route.snapshot.data['project'];
    this.shifts = this.route.snapshot.data['shift'];

    route.snapshot.data['shift'].subscribe(sh => console.log(sh))
  }

  ngOnInit() {
  }

}
