import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';
import { Shift } from '../../../../../../universal/domain/shift';

@Component({
  selector: 'apply-shifts-selected',
  templateUrl: './shifts-selected.component.html',
})
export class ShiftsSelectedComponent implements OnInit {
  public selectedShifts: Observable<Shift[]>;
  public availableShiftsNo = 0;

  constructor(private route: ActivatedRoute) {
    this.selectedShifts = Observable.combineLatest(this.route.snapshot.data['applicationShift'], this.route.snapshot.data['shift'])
      .map(([applicationShifts, shifts]: [ApplicationShift[], Shift[]]) => {
        if (!(shifts && shifts.length)) { return [] }

        const selectedShifts = shifts.filter(shift => applicationShifts.some(appShift => appShift.shiftKey === shift.$key));
        this.availableShiftsNo = shifts.length;

        return selectedShifts
      })
  }

  ngOnInit() {
  }

}
