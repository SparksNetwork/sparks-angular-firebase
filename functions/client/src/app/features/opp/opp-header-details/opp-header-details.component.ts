import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirebaseListObservable } from "angularfire2/database";
import { ICard } from "../../../core/interfaces/card.model";
import { IOpportunityCard } from "../../../core/interfaces/opportunity-card.model";

@Component({
  selector: 'app-opp-header-details',
  templateUrl: './opp-header-details.component.html'
})
export class OppHeaderDetailsComponent implements OnInit {
  private _opps: FirebaseListObservable<any[]>;
  public opps: Array<IOpportunityCard> = new Array<IOpportunityCard>();
  public opportunity: IOpportunityCard;
  constructor(
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._opps = this.route.snapshot.data['opps'];
    if (this._opps) {
      this._opps
        .subscribe((o) => {
          o.forEach(
            (s) => {
              let item = s;
              item.key = s.$key;
              this.opps.push(item);
            }
          ),
            this.onCompletedOpps()
        });
    }
  }

  private onCompletedOpps() {
    let oppKey = this.route.snapshot.params['oppKey'];
    if (oppKey) {
      this.opportunity = this.opps.find(s => s.key === oppKey);
    }
  }

}
