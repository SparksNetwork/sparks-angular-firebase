import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs'
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'project-page-project-opp',
  templateUrl: './page-project-opp.component.html'
})
export class PageProjectOppComponent implements OnInit {
  private opps: Observable<Opp[]>
  private opp: Observable<Opp>

  constructor(
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.opp = this.route.snapshot.data['opp']
      this.opps = this.route.snapshot.data['opps']

    })
  }
}
