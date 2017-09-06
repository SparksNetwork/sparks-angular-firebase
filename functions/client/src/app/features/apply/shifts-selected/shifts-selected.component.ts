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
  public selectedNo = 0;
  public availableNo = 0;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
  }

}
