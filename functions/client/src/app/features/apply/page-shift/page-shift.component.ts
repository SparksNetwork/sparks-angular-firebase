import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';
import { Project } from '../../../../../../universal/domain/project';
import { Shift } from '../../../../../../universal/domain/shift';
import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';
import { IShiftFilters } from '../shift-filter/shift-filter.component';

import { sortBy, path } from 'ramda'

@Component({
  templateUrl: './page-shift.component.html',
})
export class PageShiftComponent {
  public shifts$: Observable<Shift[]>;
  public appShifts$: Observable<ApplicationShift[]>
  public shiftsAvailable$: Observable<Shift[]>
  public project$: Observable<Project>
  public requiredShiftsCount$: Observable<number>
  public selectedShiftsCount$: Observable<number>
  public needShiftsCount$: Observable<number>

  public actionBarType = ActionBarType;
  public project: Observable<Project>;
  public shifts: Observable<Shift>;
  public selectableShifts: Shift[];
  public filteredShifts: Shift[];
  public selectedShiftsNo = 0;
  private activeFilters: IShiftFilters;

  constructor(private route: ActivatedRoute) {
    this.project$ = this.route.data.switchMap(data => data['project'] as Observable<Project>)

    this.shifts$ = this.route.data.switchMap(data => data['shift'] as Observable<Shift[]>)
      .map(shifts => sortBy(path(['startDateTime']), shifts || []))

    this.appShifts$ = this.route.data.switchMap(data => data['applicationShift'] as Observable<ApplicationShift[]>)
      .map(appShifts => sortBy(path(['shift', 'startDateTime']), appShifts))

    this.shiftsAvailable$ = Observable.combineLatest(
      this.shifts$,
      this.appShifts$.map(shifts => shifts.map(appShift => appShift['shiftKey'])),
      (shifts, shiftKeysSelected) =>
        shifts.filter(shift => shiftKeysSelected.indexOf(shift.$key) < 0)
    )

    const contribs$ = this.route.data.switchMap(data => data['contribs'] as Observable<Array<{}>>)
    this.requiredShiftsCount$ = contribs$
      .do(c => console.log('contribs', c))
      .map(contribs => contribs.find(contrib => contrib['type'] === 'Shift'))
      .pluck('count')

    this.selectedShiftsCount$ = this.appShifts$.map(appShifts => appShifts.length)
    this.needShiftsCount$ = Observable.combineLatest(
      this.requiredShiftsCount$,
      this.selectedShiftsCount$,
      (required, selected) => required - selected
    )
      .do(count => console.log('need shifts', count))
    // this.project = this.route.snapshot.data['project'];
    // this.shifts = this.route.snapshot.data['shift'];

    // this.route.snapshot.data['applicationShift']
    //   .subscribe(applicationShifts => {
    //     this.selectedShiftsNo = (applicationShifts && applicationShifts.length);
    //   });

    // Observable.combineLatest(this.route.snapshot.data['applicationShift'], this.route.snapshot.data['shift'])
    //   .subscribe(([applicationShifts, shifts]: [ApplicationShift[], Shift[]]) => {
    //     this.selectableShifts = !(shifts && shifts.length) ? [] :
    //       shifts.filter(shift => !applicationShifts.some(appShift => appShift.shiftKey === shift.$key));

    //     if (!this.filteredShifts) {
    //       this.filteredShifts = Object.assign([], this.selectableShifts);
    //     } else {
    //       this.filterShifts(this.activeFilters);
    //     }
    //   });
  }

  public filterShifts(filters: IShiftFilters) {
    this.activeFilters = filters;

    // filter the selectable shifts
    if (this.selectableShifts) {
      this.filteredShifts = this.selectableShifts.filter(data =>
        (!filters.date || data.startDateTime.startsWith(filters.date)) &&
        (!filters.team || data.teamKey === filters.team));
        // && (!filters.friend || friends.contains(filters.friend)) TODO implement later
    }
  }

}
