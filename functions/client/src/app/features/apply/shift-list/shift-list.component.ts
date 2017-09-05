import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Shift } from "../../../../../../universal/domain/shift";

@Component({
  selector: 'apply-shift-list',
  templateUrl: './shift-list.component.html',
})
export class ShiftListComponent implements OnInit {
  public shifts: Observable<(void| Shift[])[]>

  constructor(route: ActivatedRoute) { 
    this.shifts = route.snapshot.data["shift"]; 
  }

  ngOnInit() {
  }

}
