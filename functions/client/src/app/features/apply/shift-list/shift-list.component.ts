import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shift } from '../../../../../../universal/domain/shift';

@Component({
  selector: 'apply-shift-list',
  templateUrl: './shift-list.component.html',
})
export class ShiftListComponent implements OnInit {
  @Input() shifts: Shift[]

  constructor(route: ActivatedRoute) {
    this.shifts = route.snapshot.data['shift'];
  }

  ngOnInit() {
  }

}
