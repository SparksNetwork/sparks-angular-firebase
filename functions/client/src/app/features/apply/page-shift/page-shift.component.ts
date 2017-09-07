import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { Project } from '../../../../../../universal/domain/project';
import { Shift } from '../../../../../../universal/domain/shift';
import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';
import { IShiftFilters } from '../shift-filter/shift-filter.component';

@Component({
  templateUrl: './page-shift.component.html',
})
export class PageShiftComponent {

  public actionBarType = ActionBarType;
  public project: FirebaseObjectObservable<Project>;
  public shifts: FirebaseListObservable<Shift>;
  public selectableShifts: Shift[];
  public filteredShifts: Shift[];
  public selectedShiftsNo = 0;

  constructor(private route: ActivatedRoute) {
    this.project = this.route.snapshot.data['project'];
    this.shifts = this.route.snapshot.data['shift'];

    route.snapshot.data['shift'].subscribe(sh => console.log(sh))

    this.route.snapshot.data['applicationShift']
      .subscribe(applicationShifts => {
        this.selectedShiftsNo = (applicationShifts && applicationShifts.length);
      });

    Observable.combineLatest(this.route.snapshot.data['applicationShift'], this.route.snapshot.data['shift'])
      .subscribe(([applicationShifts, shifts]: [ApplicationShift[], Shift[]]) => {
        this.selectableShifts = shifts.filter(shift => !applicationShifts.some(appShift => appShift.shiftKey === shift.$key));
        this.filteredShifts = Object.assign([], this.selectableShifts);
      });
  }

  public onFiltersChanged(filters: IShiftFilters) {
    // filter the selectable shifts
    if (this.selectableShifts) {
      this.filteredShifts = this.selectableShifts.filter(data =>
        (!filters.date || data.startDateTime.startsWith(filters.date)) &&
        (!filters.team || data.teamKey === filters.team));
        // && (!filters.friend || friends.contains(filters.friend)) TODO implement later
    }
  }

}
