import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';
import { Shift } from '../../../../../../universal/domain/shift';
import { ApplicationShiftActionService } from '../../../core/sndomain/applicationShift/application-shift-action.service';

@Component({
  selector: 'apply-shifts-selected',
  templateUrl: './shifts-selected.component.html',
})
export class ShiftsSelectedComponent implements OnInit {
  public selectedShifts: Observable<Shift[]>;
  public availableShiftsNo = 0;
  private applicationShifts: ApplicationShift[];

  constructor(
    private route: ActivatedRoute,
    public applicationShiftAction: ApplicationShiftActionService
  ) {
    this.selectedShifts = Observable.combineLatest(this.route.snapshot.data['applicationShift'], this.route.snapshot.data['shift'])
      .map(([applicationShifts, shifts]: [ApplicationShift[], Shift[]]) => {
        if (!(shifts && shifts.length)) { return [] }

        const selectedShifts = shifts.filter(shift => applicationShifts.some(appShift => appShift.shiftKey === shift.$key));
        this.applicationShifts = applicationShifts;
        this.availableShiftsNo = shifts.length;

        return selectedShifts
      })
  }

  ngOnInit() {
  }

  delete(key: string) {
    const appShift = this.applicationShifts.find(as => as.shiftKey === key);
    this.applicationShiftAction.delete(appShift.$key).subscribe();
  }

  deleteAll() {
    this.applicationShifts.forEach((appShift: ApplicationShift) =>
      this.applicationShiftAction.delete(appShift.$key).subscribe()
    );
  }
}
