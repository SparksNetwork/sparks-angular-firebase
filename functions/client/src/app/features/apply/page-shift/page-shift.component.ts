import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { Project } from '../../../../../../universal/domain/project';
import { Shift } from '../../../../../../universal/domain/shift';
import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';

@Component({
  templateUrl: './page-shift.component.html',
})
export class PageShiftComponent implements OnInit {

  public actionBarType = ActionBarType;
  public project: FirebaseObjectObservable<Project>;
  public selectableShifts: Observable<Shift[]>;
  public selectedShiftsNo = 0;

  constructor(private route: ActivatedRoute) {
    this.project = this.route.snapshot.data['project'];

    this.route.snapshot.data['applicationShift']
      .subscribe(applicationShifts => this.selectedShiftsNo = (applicationShifts && applicationShifts.length))

    this.selectableShifts = Observable.combineLatest(this.route.snapshot.data['applicationShift'], this.route.snapshot.data['shift'])
      .map(([applicationShifts, shifts]: [ApplicationShift[], Shift[]]) => {
        if (!(shifts && shifts.length)) { return []; }
        return shifts.filter(shift => !applicationShifts.some(appShift => appShift.shiftKey === shift.$key));
      })
  }

  ngOnInit() {
  }

}
