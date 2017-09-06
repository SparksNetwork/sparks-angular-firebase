import { Component, OnInit, Input } from '@angular/core';
import { Shift } from '../../../../../../universal/domain/shift';

@Component({
  selector: 'apply-shift-filter',
  templateUrl: './shift-filter.component.html'
})
export class ShiftFilterComponent implements OnInit {

  @Input() shifts: Shift[]

  constructor(
  ) { }

  ngOnInit() {
  }

}
