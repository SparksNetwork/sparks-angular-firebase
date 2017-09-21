import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Shift } from '../../../../../../universal/domain/shift';
import { ApplicationShift } from '../../../../../../universal/domain/applicationShift';

import { ApplicationShiftActionService } from '../../../core/sndomain/applicationShift/application-shift-action.service';
import { Application } from '../../../../../../universal/domain/application';

@Component({
  selector: 'apply-shift-list',
  templateUrl: './shift-list.component.html',
})
export class ShiftListComponent implements OnInit {
  @Input() shifts: Shift[]
  public application: Application

  constructor(
    private route: ActivatedRoute,
    public applicationShiftAction: ApplicationShiftActionService
  ) {  }

  ngOnInit() {
    this.route.snapshot.data['application'].subscribe(app => {
      this.application = app;
    });
  }

  public select(key: string) {
    this.applicationShiftAction.createApplicationShift(this.application.$key, key)
      .subscribe((a) => { console.log(a) });
  }
}
