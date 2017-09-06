import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Shift } from '../../../../../../universal/domain/shift';
import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';

import { ApplicationShiftActionService } from '../../../core/sndomain/applicationShift/application-shift-action.service';

@Component({
  selector: 'apply-shift-list',
  templateUrl: './shift-list.component.html',
})
export class ShiftListComponent implements OnInit {
  @Input() shifts: Shift[]

  constructor(
    private route: ActivatedRoute,
    public applicationShiftAction: ApplicationShiftActionService
  ) {
    this.shifts = route.snapshot.data['shift'];
  }

  ngOnInit() {
  }

  public select(key: string) {
    const applicationShift = new ApplicationShift();
    applicationShift.appKey = this.route.snapshot.parent.paramMap.get('applicationKey');
    applicationShift.shiftKey = key;
    applicationShift.joinedOn = new Date().toISOString();

    this.applicationShiftAction.create(applicationShift).subscribe((a) => { console.log(a) });
  }
}
