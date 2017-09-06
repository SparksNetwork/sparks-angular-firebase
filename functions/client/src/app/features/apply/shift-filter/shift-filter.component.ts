import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Shift } from '../../../../../../universal/domain/shift';

@Component({
  selector: 'apply-shift-filter',
  templateUrl: './shift-filter.component.html'
})
export class ShiftFilterComponent implements OnInit {

  public shifts: Observable<(void| Shift[])>

  constructor(
    private route: ActivatedRoute
  ) {
    this.shifts = route.snapshot.data['shift'];

    route.snapshot.data['shift'].subscribe(sh => console.log(sh))
  }

  ngOnInit() {
  }

}
